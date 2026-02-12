export default function Home() {
  return (
    <div className="text-xl mt-3 ml-3">
      <div className="flex">
        <p className="w-7">id :</p>
        <input name="ID" className="border-1 mb-1 ml-2" />
      </div>
      <div className="flex">
        <p className="w-7">pw: </p>
        <input type={"password"} name="PW" className="border-1 ml-2 mb-1" />
      </div>
      <button className="bg-blue-100 rounded rounded-lg px-3 py-1 active:bg-blue-700 border-3 ml-2">
        send
      </button>
    </div>
  );
}
