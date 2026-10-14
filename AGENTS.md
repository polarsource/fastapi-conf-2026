This project is where we'll work on my talk I'll give at the first FastAPI Conference on October 28th, 2026 in Amsterdam.

- Conference website: https://fastapiconf.com

## Talk details

- Duration: 30 minutes

**You don’t need /v2: API Versioning with FastAPI**

Your team has exciting plans. Your users would prefer a quiet afternoon.

At Polar, we wanted to keep both happy: one FastAPI application, the same URLs, and date-named API versions selected by a header. We built a versioning workflow where endpoints and schema fields declare which versions they belong to and each supported version gets its own OpenAPI schema.

Then we took it all the way to our Python and TypeScript SDKs: our generator packs every supported version into its own typed module, so updating a package doesn’t have to mean upgrading the API. Versions can live side by side, and type checkers become helpful migration companions.

A practical story about making API evolution friendlier, both for the team shipping changes and the developers receiving them.

## References

- https://polar.sh/docs/api-reference/2026-04/versioning
- https://handbook.polar.sh/engineering/backend-development/api-versioning
