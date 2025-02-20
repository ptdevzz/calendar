import { motion, AnimatePresence } from 'framer-motion'
import { IoMdClose } from 'react-icons/io'
interface ModalProps {
  isOpen: boolean
  onClose?: () => void
  onSave?: () => void
  children: React.ReactNode
}
const Modal = ({ isOpen, onClose, children, onSave }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/75 z-10'>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className='bg-white rounded-2xl shadow-xl p-6 md:w-[40%] w-[80%] relative'
          >
            <button
              className='absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200'
              onClick={onClose}
            >
              <IoMdClose size={20} />
            </button>
            {children}
            <div className='flex justify-end space-x-2 mt-6'>
              <button
                onClick={onClose}
                type='button'
                className='px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400'
              >
                Cancel
              </button>
              <button
                type='submit'
                onClick={onSave}
                className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Modal
