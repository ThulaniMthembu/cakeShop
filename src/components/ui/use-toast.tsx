import { toast as hotToast, ToastOptions } from 'react-hot-toast'

interface ToastProps {
  title: string
  description: string
}

export const toast = ({ title, description }: ToastProps, options?: ToastOptions) => {
  return hotToast(
    () => (
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    ),
    {
      duration: 3000,
      ...options,
    }
  )
}