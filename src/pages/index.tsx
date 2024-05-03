/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import AddCategoryDialog from "@/components/AddCategoryDialog";
import Categories from "@/components/Categories";
import LoginPage from "@/components/LoginPage";
import { logout, type UserRootState } from "@/components/Store/UserStore";
import { type RootState, addCategory } from "@/components/Store/store";
import { type Category } from "@/types/categories";
import {
  Add,
  Check,
  ControlPoint,
  Search,
  SwapVert,
} from "@mui/icons-material";
import { Avatar, Menu, MenuItem } from "@mui/material";
import Head from "next/head";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Home() {
  const [dialog, setDialog] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [sortSeverity, setSortSeverity] = useState("All");
  const [sortDate, setSortDate] = useState(false);
  const [sortMenu, setSortMenu] = useState(false);
  const sortMenuRef = useRef<HTMLButtonElement>(null);
  const sortSeverityRef = useRef<HTMLButtonElement>(null);
  const [sortSeverityMenu, setSortSeverityMenu] = useState(false);
  const [searchedCategory, setSearchedCategory] = useState<Category[]>();
  const [logoutMenu, setLogoutMenu] = useState(false);
  const logoutRef = useRef(null);
  const [addedCategory, setAddedCategory] = useState<Category>({
    name: "",
    tasks: [],
  });
  const AllCategories = useSelector((state: RootState) => state.categories);
  const Checklogin = useSelector((state: UserRootState) => state?.user);
  useEffect(() => {
    if (search !== "") {
      const categoryMatchesSearch = (category: Category) => {
        return category.tasks?.some((task) =>
          task.issue_title.toLowerCase().includes(search.toLowerCase()),
        );
      };
      const filterCategory = AllCategories.filter((category) =>
        categoryMatchesSearch(category),
      );
      setSearchedCategory(filterCategory);
    }
  }, [AllCategories, search]);

  const handleSortDate = () => {
    setSortMenu(false);
    setSortDate(!sortDate);
  };
  const handleSortSeverity = (severity: string) => {
    setSortSeverityMenu(!sortSeverityMenu);
    setSortSeverity(severity);
  };
  const handleAddCategory = () => {
    setDialog(false);

    if (addedCategory.name !== "") {
      if (
        AllCategories.length === 0 ||
        AllCategories.find(
          (x) => x.name.toLowerCase() === addedCategory.name.toLowerCase(),
        ) === undefined
      ) {
        dispatch(addCategory(addedCategory));
        setAddedCategory({ name: "", tasks: [] });
      }
    }
  };
  const handleLogout = () => {
    setLogoutMenu(false);
    localStorage.setItem(
      "user",
      JSON.stringify({ loggedIn: false, username: null, password: null }),
    );
    dispatch(logout());
  };
  return Checklogin?.loggedIn ? (
    <>
      <Head>
        <title>kanban-board</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen space-y-5 !overflow-x-hidden p-5">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">Vulnerabilities</h1>
          <div ref={logoutRef}>
            <Avatar className="!h-8 !w-8" onClick={() => setLogoutMenu(true)} />
            <Menu
              open={logoutMenu}
              onClose={() => setLogoutMenu(false)}
              anchorEl={logoutRef.current}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem className="!text-sm" onClick={handleLogout}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 rounded-lg border-[1px] border-gray-200 px-3 py-[6px] text-sm font-semibold shadow-sm">
            <Search fontSize="small" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="bg-transparent outline-0"
              placeholder="Search by issue name..."
            />
          </div>

          <div className="!relative">
            <button
              ref={sortMenuRef}
              onClick={() => setSortMenu(true)}
              className="flex items-center gap-1 rounded-lg border-[1px] border-gray-200 px-3 py-[6px] text-sm font-semibold shadow-sm transition-colors hover:bg-gray-100"
            >
              <SwapVert fontSize="small" />
              <span>Sort By</span>
            </button>
            <Menu
              open={sortMenu}
              anchorEl={sortMenuRef.current}
              onClose={() => setSortMenu(false)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem
                className="flex gap-1 !text-sm"
                onClick={handleSortDate}
              >
                <div>By Date</div>
                {sortDate && <Check fontSize="small" />}
              </MenuItem>
            </Menu>
          </div>
          <div>
            <button
              onClick={() => setSortSeverityMenu(true)}
              ref={sortSeverityRef}
              className="flex items-center gap-2 rounded-lg border-[1px] border-dashed border-gray-200 px-3 py-[6px] text-sm font-semibold shadow-sm transition-colors hover:bg-gray-100"
            >
              <ControlPoint fontSize="small" />
              <span>Severity</span>{" "}
            </button>
            <Menu
              open={sortSeverityMenu}
              anchorEl={sortSeverityRef.current}
              onClose={() => setSortSeverityMenu(false)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {["All", "low", "medium", "high", "critical"].map((x) => (
                <MenuItem
                  key={x}
                  onClick={() => handleSortSeverity(x)}
                  className="!flex !items-center !gap-x-2"
                >
                  <span>{x}</span>
                  {sortSeverity === x && <Check fontSize="small" />}
                </MenuItem>
              ))}
            </Menu>
          </div>
          <button className="flex items-center gap-2 rounded-lg border-[1px] border-dashed border-gray-200 px-3 py-[6px] text-sm font-semibold shadow-sm transition-colors hover:bg-gray-100">
            <ControlPoint fontSize="small" />
            <span>Status</span>
          </button>
        </div>
        <Swiper
          className="flex min-h-full w-screen"
          spaceBetween={20}
          freeMode={true}
          slidesPerView={5}
          navigation={true}
          pagination={true}
        >
          {search === "" ? (
            AllCategories.length !== 0 &&
            AllCategories.map((x) => (
              <SwiperSlide key={x.name} className="!min-w-max">
                {" "}
                <Categories
                  name={x.name}
                  tasks={x.tasks}
                  checkSortDate={sortDate}
                  checkSortSeverity={sortSeverity}
                />
              </SwiperSlide>
            ))
          ) : searchedCategory?.length !== 0 ? (
            searchedCategory?.map((x) => (
              <SwiperSlide key={x.name} className="!min-w-max">
                {" "}
                <Categories
                  name={x.name}
                  tasks={x.tasks}
                  checkSortDate={sortDate}
                  checkSortSeverity={sortSeverity}
                />
              </SwiperSlide>
            ))
          ) : (
            <div className="py-2 text-xl">Nothing found</div>
          )}
          <SwiperSlide>
            <div
              onClick={() => setDialog(true)}
              className="flex !h-[400px]  w-[270px] !min-w-max  flex-col items-center justify-center rounded-lg border-[2px] border-dashed border-gray-300 !text-gray-400"
            >
              <Add className="!h-10 !w-10" />
              <p>Add a Category</p>
            </div>
          </SwiperSlide>
          <AddCategoryDialog
            open={dialog}
            setOpen={setDialog}
            onClick={handleAddCategory}
            value={addedCategory.name}
            setValue={setAddedCategory}
          />
        </Swiper>
      </main>
    </>
  ) : (
    <LoginPage />
  );
}
