export function formatDate(value: string): string {
  if (!value) {
    return '无截止日期';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '日期无效';
  }

  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function isOverdue(value: string): boolean {
  if (!value) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const date = new Date(value);
  date.setHours(0, 0, 0, 0);

  return date.getTime() < today.getTime();
}
