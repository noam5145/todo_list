import { toast } from 'react-toastify';

export function notifyDel() {
  toast.success('👍 המשימה נמחקה בהצלחה' , {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    };

export function notifySend(){
  toast.success('👍 המשימה נשלחה לאישור בהצלחה' , {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    };

