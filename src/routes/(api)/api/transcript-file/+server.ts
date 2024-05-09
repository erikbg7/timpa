import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { SUPABASE_PROJECT_URL } from '$env/static/private';
import { Language } from '$lib/enums';

export const DELETE = async (event: RequestEvent) => {
	const supabase = event.locals.supabase;
	const prisma = event.locals.prisma;
	const session = await event.locals.getSession();
	if (!session) {
		return { status: 401 };
	}
	const formData = await event.request.formData();
	console.log('delete', { formData });

	const fileId = formData.get('fileId') as string;

	const { error } = await supabase.storage.from('files').remove([`${session.user.id}/${fileId}`]);
	if (!error) {
		await prisma.file.delete({
			where: {
				id: fileId,
			},
		});
	}

	console.log('succe deletion');

	return json({ success: true });
};

export const POST = async (event: RequestEvent) => {
	console.log('transcript');
	const supabase = event.locals.supabase;
	const prisma = event.locals.prisma;
	const session = await event.locals.getSession();
	if (!session) {
		return { status: 401 };
	}

	const formData = await event.request.formData();

	const file = formData.get('file') as File;
	const name = formData.get('name') as string;

	const fileName = name || file.name;
	const fileExtension = file.name.split('.').pop() as string;

	if (!file || !fileExtension) {
		return { status: 400, body: 'No file found' };
	}

	const bucket = 'files';
	const fileId = Date.now().toString().concat(`.${fileExtension}`);
	const folderId = session.user.id;

	// 1.Upload file to supabase storage
	const { data, error } = await supabase.storage
		.from(bucket)
		.upload(`${folderId}/${fileId}`, file, {
			cacheControl: '3600',
			upsert: false,
		});

	if (error) {
		return { status: 400, body: 'No file found' };
	}

	// 2.Add file reference to database with IN_PROGRESS status
	const url = `${SUPABASE_PROJECT_URL}/storage/v1/object/${bucket}/${folderId}/${fileId}`;

	const customer = await event.locals.prisma.customer.findUnique({
		where: {
			email: session!.user.email!,
		},
	});

	const createdFile = await prisma.file.create({
		data: {
			name: fileName,
			url: `${SUPABASE_PROJECT_URL}/storage/v1/object/${bucket}/${folderId}/${fileId}`,
			extension: 'IN_PROGRESS',
			language: Language.CA,
			customerId: customer!.id,
		},
	});

	// if file creation fails, delete file from storage

	console.log({ createdFile });

	// 3.Use Replicate service to generate transcript json

	// 4.Save JSON transcript to database with status READY

	return json({ url });
};
