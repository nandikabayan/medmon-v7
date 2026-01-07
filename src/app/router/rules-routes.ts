export function isProjectExpire(project: any): boolean {
  if (!project?.periode?.end_date) return false;

  const targetTime = new Date(project.periode.end_date).getTime();
  const currentTime = Date.now();

  return targetTime <= currentTime;
}

export function isRoutesPermitted(user: any, project: any, routes: string) {
    return true;
}