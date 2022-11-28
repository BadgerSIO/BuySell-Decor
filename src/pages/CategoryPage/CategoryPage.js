import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import BookingModal from "../../shared/BookingModal/BookingModal";
import Loader from "../../shared/Loader/Loader";
import Titles from "../../utilities/Titles";
import CategoryProduct from "./CategoryProduct";

const CategoryPage = () => {
  const data = useLoaderData().data;
  const [current, setCurrent] = useState(null);
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <section className="py-8 md:py-10 lg:py-10 min-h-[86vh]">
      <div className="container">
        <Titles>
          Category:<span className="text-primary">{data[0].category}</span>
        </Titles>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-10 mt-5">
          {data?.map((product) => (
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
        ></BookingModal>
      )}
    </section>
  );
};

export default CategoryPage;
