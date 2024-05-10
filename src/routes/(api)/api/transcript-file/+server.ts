import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { SUPABASE_STORAGE_URL, SUPABASE_STORGE_BUCKET } from '$env/static/private';
import { Language } from '$lib/enums';

export const POST = async (event: RequestEvent) => {
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
	const fileId = Date.now().toString().concat(`.${fileExtension}`);

	if (!file || !fileExtension) {
		return { status: 400, body: 'No file found' };
	}

	// 1.Upload file to supabase storage
	const { data, error } = await supabase.storage
		.from(SUPABASE_STORGE_BUCKET)
		.upload(`${session.user.id}/${fileId}`, file, {
			cacheControl: '3600',
			upsert: false,
		});

	if (error) {
		return { status: 400, body: 'No file found' };
	}

	// 2.Add file reference to database with IN_PROGRESS status
	const createdFile = await prisma.file.create({
		data: {
			name: fileName,
			extension: 'IN_PROGRESS',
			language: Language.CA,
			customerId: session.user.id,
			url: `${SUPABASE_STORAGE_URL}/${SUPABASE_STORGE_BUCKET}/${data.path}`,
		},
	});

	// if file creation fails, delete file from storage

	// 3.Use Replicate service to generate transcript json

	// 4.Save JSON transcript to database with status READY

	return json('ok');
};
