import * as Dialog from "@radix-ui/react-dialog"

interface ModalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  message: string
  type?: "alert" | "success"
}

const ModalDialog = ({
  open,
  onOpenChange,
  title,
  message,
  type = "alert",
}: ModalDialogProps) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
      <Dialog.Content
        className="
          fixed top-1/2 left-1/2 z-50
          -translate-x-1/2 -translate-y-1/2
          bg-white rounded-[10px] w-full max-w-xs p-6
          shadow-lg text-center
          border-[2px] border-[#293296]
          font-[signika]
        "
      >
        <Dialog.Title
          className="
            text-2xl font-normal mb-2 text-[#293296]
            font-['Permanent_Marker']
            text-center
          "
        >
          {title}
        </Dialog.Title>
        <div className="mb-4 text-base text-[#293296] font-[signika]">
          {message}
        </div>
        <Dialog.Close asChild>
          <button
            type="button"
            className={`px-6 py-2.5 rounded-[30px] font-[signika] text-base mt-2 w-full block font-medium transition ${
              type === "success"
                ? "bg-transparent border-[2px] border-[#968D29] text-[#968D29]"
                : type === "alert"
                  ? "bg-transparent border-[2px] border-[#962929] text-[#962929]"
                  : "bg-[#293296] text-white"
            } hover:opacity-90 disabled:opacity-50`}
          >
            OK
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)

export default ModalDialog
