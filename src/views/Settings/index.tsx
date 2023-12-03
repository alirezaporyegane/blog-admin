import { HeaderNameContext } from "@/context/HeaderNameContext"
import { useContext, useEffect } from "react"

const Settings = () => {
  const { setName } = useContext(HeaderNameContext)

  useEffect(() => setName('تنظیمات'))
  return 'setting'
}

export default Settings
