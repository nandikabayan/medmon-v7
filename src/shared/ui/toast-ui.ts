import Swal from 'sweetalert2';

export function showToast(
  type: 'success' | 'error',
  title: string
) {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: type,
    title,
    timer: 3000,
    showConfirmButton: false,
  });
}
