import { executeOnYourOwn } from "@/lib/helper"

async function page() {
  const execute = executeOnYourOwn();
  return (
    <div>page</div>
  )
}

export default page