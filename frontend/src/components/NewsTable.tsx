import { Table, Tag, Space, Pagination } from "antd";
import SearchInput from "./SearchInput";
import { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts, updatePost } from "../api/postsApi";
import type { Post } from "../types";
import type { ColumnsType } from "antd/es/table";
import NewsForm from "./NewsForm";
import Filter from "./filter/Filter";
import StatusSelect from "./StatusSelect";

export default function NewsTable() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  const publishOptions = [
    { label: "Publish", value: "publish", color: "#1DB100" },
    { label: "Draft", value: "draft", color: "#F57C11" },
  ];

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("active");
  const [type, setType] = useState("all");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<Post | null>(null);
  useEffect(() => {
    setPage(1);
  }, [search, filterStatus, type]);

  const filteredData = posts
    ?.filter((item) => (filterStatus ? item.status === filterStatus : true))
    ?.filter((item) => (type === "all" ? true : item.type === type))
    ?.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
  const pagedData = filteredData?.slice((page - 1) * pageSize, page * pageSize);

  const columns: ColumnsType<Post> = [
    {
      title: "Post",
      key: "post",
      width: 332,
      align: "left",
      render: (item: Post) => (
        <div className="flex items-center gap-3">
          <img
            src={item.coverImage}
            alt={item.title}
            className="w-32 h-24 rounded-md object-cover object-center"
          />

          <div className="flex flex-col justify-center gap-1.5">
            <p className="font-semibold text-[#1E1E1E] text-[16px] line-clamp-1">
              {item.title}
            </p>
            <div
              className="text-[#8E8E8E] text-[14px] line-clamp-3 prose max-w-none prose-img:hidden"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (type: string) => (
        <div className="flex items-center justify-center text-[16px]">
          {type === "news" ? (
            <Tag
              style={{
                background: "#c4deff",
                border: "none",
                color: "rgba(20, 71, 230, 1)",
              }}
            >
              News
            </Tag>
          ) : (
            <Tag
              style={{
                background: "rgba(243, 232, 255, 1)",
                border: "none",
                color: "rgba(130, 0, 219, 1)",
              }}
            >
              Announcement
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: "Sharing Time",
      key: "date",
      align: "center",
      render: (item: Post) => (
        <span>
          {item.date}
          <br />
          <span className="text-[12px] text-[#9B9B9B]">{item.time}</span>
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: string) => (
        <Space>
          {status === "active" ? (
            <p className="bg-[#E7FFE1] rounded-[6px] py-1 px-3 flex items-center justify-center gap-2.5">
              <span className="w-[5px] h-[5px] rounded-full bg-[#145E00] inline-block"></span>
              <span className="text-[#145E00]">Active</span>
            </p>
          ) : (
            <p className="bg-[#ffdada] rounded-[6px] py-1 px-3 flex items-center justify-center gap-2.5">
              <span className="w-[5px] h-[5px] rounded-full bg-[#D82C2C] inline-block"></span>
              <span className="text-[#D82C2C]">Inactive</span>
            </p>
          )}
        </Space>
      ),
    },
    {
      title: "Publish Status",
      dataIndex: "publishStatus",
      key: "publishStatus",
      align: "center",
      render: (status: string, item: Post) => (
        <StatusSelect
          value={publishOptions.find((opt) => opt.value === status)!}
          options={publishOptions}
          onChange={(opt) => {
            updateMutation.mutate({
              ...item,
              publishStatus: opt.value as "publish" | "draft",
            });
          }}
        />
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",

      render: (item: Post) => (
        <Space size="middle">
          <button
            className="text-[#243C7B] hover:opacity-70 transition-opacity"
            onClick={() => {
              setSelectedNews(item);
              setIsEditOpen(true);
            }}
          >
            <img src="/edit.png" className="w-4 h-4" />
          </button>

          <button
            className="text-[#D82C2C] hover:opacity-70 transition-opacity"
            onClick={() => {
              setSelectedNews(item);
              setIsDeleteOpen(true);
            }}
          >
            <img src="/smalldelete.png" className="w-4 h-4" />
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 border  border-[#f7f7f7] rounded-[12px] p-6 mb-4 shadow-xs">
        {" "}
        <Filter
          label="Type"
          selected={
            type === "all"
              ? "All Posts"
              : type === "news"
              ? "News"
              : "Announcements"
          }
        >
          <button
            onClick={() => setType("all")}
            className="flex items-center gap-2 w-full px-3 py-2 hover:text-[#243C7B]"
          >
            All Posts
          </button>
          <button
            onClick={() => setType("news")}
            className="flex items-center gap-2 w-full px-3 py-2 hover:text-[#243C7B]"
          >
            News
          </button>
          <button
            onClick={() => setType("announcement")}
            className="flex items-center gap-2 w-full px-3 py-2 hover:text-[#243C7B]"
          >
            Announcements
          </button>
        </Filter>
        <Filter
          label="Status"
          selected={filterStatus === "active" ? "Active" : "Inactive"}
        >
          <button
            onClick={() => setFilterStatus("active")}
            className="flex items-center gap-2 w-full px-3 py-2 hover:text-[#243C7B]"
          >
            <span className="w-[5px] h-[5px] rounded-full bg-[#145E00] inline-block"></span>
            Active
          </button>
          <button
            onClick={() => setFilterStatus("inactive")}
            className="flex items-center gap-2 w-full px-3 py-2 hover:text-[#243C7B]"
          >
            <span className="w-[5px] h-[5px] rounded-full bg-[#D82C2C] inline-block"></span>
            Inactive
          </button>
        </Filter>
        <SearchInput value={search} onChange={setSearch} />
      </div>
      <div className="">
        <Table
          columns={columns}
          dataSource={pagedData}
          loading={isLoading}
          rowKey="id"
          scroll={{ x: "max-content" }}
          pagination={false}
        />
      </div>
      <div className="w-full flex items-center justify-center ">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={filteredData?.length}
          onChange={setPage}
          showSizeChanger
        />
      </div>
      {isDeleteOpen && (
        <DeleteModal
          post={selectedNews}
          onClose={() => setIsDeleteOpen(false)}
        />
      )}
      {isEditOpen && (
        <NewsForm
          post={selectedNews}
          setOpenModal={() => {
            setIsEditOpen(false);
            setSelectedNews(null);
          }}
        />
      )}
    </div>
  );
}
