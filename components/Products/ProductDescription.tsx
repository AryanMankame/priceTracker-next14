async function ProductDescription({ data } : any) {
  const description = data.rows[0].description.split('/=/');
  return (
    <div className="w-screen mt-14">
        <h3 className = "font-bold pl-28 text-2xl mb-10">Product Description</h3>
        <div className="pl-28 pr-28">
            <ul className = "list-disc">
                {
                    description.map((item : any) => {
                        return <li key = {item}>{item}</li>
                    })
                }
            </ul>
        </div>
        <div>
            <button className = "w-fit my-14 mx-auto bg-black flex items-center justify-center gap-3 min-w-[200px] py-4 px-4 bg-secondary hover:bg-opacity-70 rounded-[30px] text-white text-lg font-semibold">
                <span>
                    <img src="https://raw.githubusercontent.com/adrianhajdin/pricewise/94b72079a2f7928d194087df60e9fb1c04446636/public/assets/icons/bag.svg" alt="" />
                </span>
                <span>
                    Buy Now
                </span>
            </button>
        </div>
    </div>
  )
}

export default ProductDescription