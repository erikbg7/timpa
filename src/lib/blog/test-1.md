---
# frontmatter goes here

postDate: '2021-04-07'
postLastUpdate: '2021-04-07'
postTitle: 'Best Medium Format Camera for Starting Out'
postReadingTime: 5
postDescription: "Best medium format camera for starting out is probably a question at the front of your mind right now! Let's take a look."

seoFocusKeyphrase: 'best medium format camera'
seoMetaDescription: "Best medium format camera for starting out is probably a question at the front of your mind right now! Let's take a look."
featuredImage: 'https://xata.io/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2Fxataio%2Fmdx-blog%2Fmain%2Fimages%2Fcover-dedicated-clusters.jpg&w=1920&q=75'
featuredImageAlt: 'Photograph of a Hasselblad medium format camera with the focusing screen exposed'
ogImage: 'best-medium-format-camera-for-starting-out-open-graph.jpg'
ogSquareImage: 'best-medium-format-camera-for-starting-out-open-graph-square.jpg'
twitterImage: 'best-medium-format-camera-for-starting-out-twitter.jpg'
categories: ''
tags: ''
---

The key features of dedicated clusters are:

Xata databases and branches can be allocated to a dedicated cluster. You can allocate a single branch (for example, only your production branch) or multiple branches (for example, all your development branches).
You'll be able to move Postgres databases between dedicated clusters with no or minimal downtime.
You can configure dedicated clusters with a configurable number of read replicas, and you can ask for them to be in different availability zones.
You can choose between a wide range of instance types or you can define a minimum and maximum CPU/RAM configuration and let auto-scaling choose the right size dynamically based on load. Scaling up is almost instant and scaling down is done automatically in a matter of minutes.
The per-GB cost of storage is significantly cheaper (20 times less!) than the storage cost for shared clusters.
A dedicated cluster is free from all limitations we impose on our shared clusters to protect from abuse: rate and concurrency limits as well as some limitations on the SQL commands you can execute.
Before we dive into the specifics of dedicated clusters, let's take a step back and provide some insight into our current architecture so you can understand the difference and the importance of having optionality.

## Shared cell architecture

Xata has a cell-based architecture, in which each cell consists of a Postgres Aurora cluster, an Elasticsearch cluster, a queue, and the associated services that serve the Data API, the SQL wire protocol, and more. The cells form our data plane where we serve our users through our Data API and the Postgres wire protocol.

We have several cells in one region and each of them is multi-tenant. Essentially, they are being shared between several users, which allows us to offer a generous free tier (15GB of storage, HA included, no pausing) and in general a very good offering for “small scale”. Having this cell-splitting system in a region ensures that one noisy neighbor will not affect the whole region. It will, however, affect the cell they live in. In order to mitigate the noisy neighbor issues, we have rate limits and concurrency limits in place and we are monitoring for abuse.

This approach is great for small projects, indie developers and so on. When your project grows beyond a few tens of GB in storage however, there are benefits to having your own dedicated infrastructure. You also get more control over the cluster configuration (quantity of read replicas, auto-scaling policies, etc.). Dedicated infrastructure also makes it a lot easier to go through security reviews and other compliance processes.

Our dedicated clusters are, at their core, dedicated cells. You can create branches on them and use them just like you use your branches that got created on shared cells. The difference is, it is only you living in that cell.

## Dedicated Clusters Infrastructure
With the addition of dedicated clusters, we are allowing users to create infrastructure on demand, via a CRUD management API, which is exposed in the Xata UI.

This means that at any given moment, a user will be able to add to our fleet of cells in a region, and we need to be able to allocate database branches to the new cells.

As a concept, a cluster “lives” under a workspace, at the same level as a database. Both clusters and databases can only be created in the context of a region and there is a many-to-many relationship between them. You can have database branches created on different dedicated clusters and at the same time you can have branches from various databases created on the same dedicated cluster.

Under the hood, we use Kubernetes to manage both infrastructure and networking via Crossplane, a CNCF project for building and managing control planes. The configuration and desired state of this infrastructure are stored in Kubernetes as custom definitions backed by Crossplane, and it falls to Crossplane to call the relevant APIs and reconcile this desired state with AWS.

All of the supporting Xata cell services are uniquely created on a per-cell basis for dedicated clusters, and these also run in Kubernetes. These are created and managed alongside the infrastructure that Crossplane manages. These services are not shared between every dedicated cluster within a workspace but serve traffic only to that single dedicated cluster, allowing more granular control over considerations like traffic management, scaling, and deployments.

## Challenges

When implementing the backend support for dedicated clusters, we had some architectural challenges to deal with.

### Multiple sources of truth

As you can see in the diagram below, Xata stored metadata at various levels. There is metadata stored in the control plane central metadata store - for the entities that need to be known at workspace level and there is also a regional metadata store where the regional entities' information is stored.

On top of that, because we use Kubernetes to manage the on-demand infrastructure, it has its own metadata data store as well.

A dedicated cluster is a regional entity that needs to be known at the workspace level and also at the regional level. Kubernetes spins up the dedicated infrastructure, which means it also needs to hold data on the cluster.

That leaves us with three data stores that we need to keep in sync.
