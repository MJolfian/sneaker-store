// JavaScript Document
export function showToast(message, type = 'danger', timeout = 4000) {
    const toast = document.createElement('div');

    const styles = {
        danger: {
            icon: '✕',
            iconClass: 'text-red-600 border-red-200 bg-red-50'
        },
        success: {
            icon: '✓',
            iconClass: 'text-green-600 border-green-200 bg-green-50'
        },
        warning: {
            icon: '!',
            iconClass: 'text-yellow-600 border-yellow-200 bg-yellow-50'
        },
        info: {
            icon: 'i',
            iconClass: 'text-blue-600 border-blue-200 bg-blue-50'
        }
    };

    const style = styles[type] ?? styles.danger;

    toast.className = `fixed z-1 bottom-[90px] left-1/2 -translate-x-1/2 w-[88.78%] max-w-95 bg-white border border-gray-200 rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 font-inter`;

    toast.innerHTML = `<span class="w-7 h-7 shrink-0 rounded-full border flex items-center justify-center font-semibold text-sm ${style.iconClass}">${style.icon}</span>

    <p class="flex-1 text-sm/[150%] font-medium text-title"> ${message} </p>
	<button type="button" class="text-xl leading-none text-cool-gray-600 cursor-pointer hover:text-title" aria-label="Close"> × </button>`;

    document.body.append(toast);

    const closeBtn = toast.querySelector('button');

    const removeToast = () => {
        if (toast.isConnected) {
            toast.remove();
        }
    };

    closeBtn.addEventListener('click', removeToast);

    setTimeout(removeToast, timeout);
}