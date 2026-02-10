"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Shell from "../../components/Shell";
import DocumentsTable from "../../components/DocumentsTable";
import UploadCard from "../../components/UploadCard";

export default function AdminDocumentsPage() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <Shell role="Admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Documents</h1>
          <p className="text-[var(--muted)]">Manage shared files and assets.</p>
        </div>
        <UploadCard />
        <DocumentsTable canManage />
      </div>
    </Shell>
  );
}
