import Swal from 'sweetalert2';

export async function confirmAction(
  title: string,
  subtitle: string,
  confirmText: string
): Promise<boolean> {
  const result = await Swal.fire({
    title,
    html: subtitle,
    showCancelButton: true,
    confirmButtonText: confirmText,
  });

  return result.isConfirmed;
}
