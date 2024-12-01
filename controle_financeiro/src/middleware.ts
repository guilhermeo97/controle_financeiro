import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  // Verifica se o token existe, se não, redireciona para /login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(); // Permite continuar para a rota
}

export const config = {
  matcher: ["/finances", "/finances/:id"], // Define as rotas protegidas
};
