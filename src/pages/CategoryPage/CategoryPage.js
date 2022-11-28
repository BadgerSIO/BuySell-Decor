import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import BookingModal from "../../shared/BookingModal/BookingModal";
import Loader from "../../shared/Loader/Loader";
import Titles from "../../utilities/Titles";
import CategoryProduct from "./CategoryProduct";

const CategoryPage = () => {
  const datas = useLoaderData().data;
  console.log(datas);
  const [current, setCurrent] = useState(null);
  const { user, loading, logout } = useContext(AuthContext);
  const reportItem = (item) => {
    fetch(`http://localhost:5000/reportProduct/${item._id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Reported");
      })
      .catch((err) => console.log(err));
  };
  if (loading) {
    return <Loader></Loader>;
  } else if (datas.length > 0) {
    return (
      <section className="py-8 md:py-10 lg:py-10 min-h-[86vh]">
        <div className="container">
          <Titles>
            Category:<span className="text-primary">{datas[0].category}</span>
          </Titles>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-10 mt-5">
            {datas?.map((product) => (
              <CategoryProduct
                key={product._id}
                product={product}
                setCurrent={setCurrent}
              ></CategoryProduct>
            ))}
          </div>
        </div>
        {current && (
          <BookingModal
            user={user}
            current={current}
            setCurrent={setCurrent}
            logout={logout}
            reportItem={reportItem}
          ></BookingModal>
        )}
      </section>
    );
  } else {
    return (
      <section className="py-8 md:py-10 lg:py-10 min-h-[86vh]">
        <div className="container">
          <Titles>No Products Under Category</Titles>
        </div>
      </section>
    );
  }
};

export default CategoryPage;
