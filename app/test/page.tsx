import { executeOnYourOwn } from "@/lib/helper"

async function page() {
  executeOnYourOwn();
  return (
    <div>page</div>
  )
}

export default page