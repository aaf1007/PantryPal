import IngredientsCall from '../components/IngredientsCall'

export default function IngredientsPage() {
  return (
    <div className="grid grid-rows-[100px_1fr] h-dvh overflow-hidden">
      <div className="row-start-2 overflow-y-auto flex justify-center items-start py-8 px-4">
        <IngredientsCall />
      </div>
    </div>
  )
}
