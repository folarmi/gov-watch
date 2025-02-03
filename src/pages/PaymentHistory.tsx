/* eslint-disable @typescript-eslint/no-explicit-any */
import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import { useGetData } from "../hooks/apiCalls";
import { SettingsLayout } from "../layouts/SettingsLayout";
import { useEffect, useState } from "react";
import { RootState } from "../lib/store";
import { useAppSelector } from "../lib/hook";
import Loader from "../component/Loader";
import Table from "../component/Table";
import moment from "moment";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const PaymentHistory = () => {
  const queryClient = useQueryClient();
  const [shouldFetch, setShouldFetch] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState("");

  const { userId } = useAppSelector((state: RootState) => state.auth);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 12,
  });
  const { data: paymentsData, isLoading } = useGetData({
    url: `Payments/GetPayments?userPublicId=${userId}&pageNumber=${
      pagination.pageIndex + 1
    }&pageSize=${pagination.pageSize}`,
    queryKey: ["GetAllPaymentTable", JSON.stringify(pagination)],
  });

  const { data: verifyPaymentData, isSuccess } = useGetData({
    url: `Payments/VerifyPayment?paymentReferenceNumber=${selectedPaymentId}&userId=${userId}&channel=paystack`,
    queryKey: ["VerifyPayment"],
    enabled: shouldFetch,
  });

  useEffect(() => {
    if (isSuccess && verifyPaymentData) {
      if (verifyPaymentData.statusCode === 200) {
        setShouldFetch(false);
        toast.success("Payment verification successful!");
        queryClient.invalidateQueries({
          queryKey: ["GetAllPaymentTable"],
        });
      }
    }
  }, [isSuccess, verifyPaymentData, queryClient, setShouldFetch]);

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("channel", {
      header: "Channel",
      cell: (info) => (
        <span className="text-sm font-normal">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("paymentReferenceId", {
      header: "Reference Id",
      cell: (info) => <p className="text-sm font-normal ">{info.getValue()}</p>,
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => (
        <span className="text-sm font-normal">
          {moment(info.getValue()).format("DD-MM-YYYY")}
        </span>
      ),
    }),
    columnHelper.accessor("isConfirmed", {
      header: "Status",
      cell: (info) => (
        <span
          className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg ${
            info.getValue() === true
              ? "bg-green_300 text-green_100"
              : "bg-red-300 text-red-700"
          }`}
        >
          {info.getValue() === true ? "Verified" : "Unverified"}
        </span>
      ),
    }),
    columnHelper.accessor("publicId", {
      header: "Action",
      cell: (info) => {
        const rowData = info.row.original;

        return (
          <div className="flex space-x-4">
            {!rowData?.isConfirmed && (
              <button
                onClick={() => {
                  setSelectedPaymentId(rowData?.paymentReferenceId);
                  setShouldFetch(true);
                }}
                className={`px-6 py-1 text-sm bg-primary cursor-pointer text-white rounded ${
                  isLoading && ' opacity-50 cursor-not-allowed"'
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <img src="/loading.svg" />
                    Loading...
                  </div>
                ) : (
                  <p>Verify</p>
                )}
              </button>
            )}
          </div>
        );
      },
    }),
  ];

  return (
    <SettingsLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <Table
          columns={columns}
          data={paymentsData?.paymentViewModel}
          rowCount={paymentsData?.totalCount || 0}
          pagination={pagination}
          setPagination={setPagination}
        />
      )}
    </SettingsLayout>
  );
};

export { PaymentHistory };
