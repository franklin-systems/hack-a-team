import Avatar from 'components/avatar'

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="h-screen sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <div className="my-4">
              <Avatar
                size="large"
                src="https://user-images.githubusercontent.com/1410181/221963178-ebddf3f7-1361-42b0-91dd-ea73a1412715.png"
              />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome!
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Soon, this app will do a bunch of stuff!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
