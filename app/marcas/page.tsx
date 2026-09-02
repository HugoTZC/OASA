import { SiteLayout } from "@/components/site-layout"

export default function MarcasPage() {
  return (
    <SiteLayout>
      <main className="min-h-[60vh] bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl">
            🚧
          </div>
          <h1 className="mb-4 text-4xl font-bold text-blue-900">Marcas</h1>
          <p className="mb-8 text-xl text-gray-600">
            Estamos preparando esta sección para presentarte las marcas con las que trabajamos.
          </p>
          <div className="inline-block rounded-lg bg-yellow-400 px-6 py-3 font-bold text-gray-900">
            Próximamente
          </div>
        </div>
      </main>
    </SiteLayout>
  )
}
