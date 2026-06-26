import AdminLayoutWrapper from '@/components/admin/AdminLayoutWrapper';

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
