import { apiNotFound, methodNotAllowed } from "@/lib/http/api"

function instance(path?: string[]) {
  return path?.length ? `/api/${path.join("/")}` : "/api"
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path } = await params
  return apiNotFound(instance(path))
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path } = await params
  return methodNotAllowed(instance(path))
}

export async function PUT(
  _request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path } = await params
  return methodNotAllowed(instance(path))
}

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path } = await params
  return methodNotAllowed(instance(path))
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path } = await params
  return methodNotAllowed(instance(path))
}
