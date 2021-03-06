import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import CardUpdate from "./CardUpdate";
import { NikeStore } from "./NikeStore";
import { CardActions, IconButton, Button } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { RemoveShoppingCart } from "@material-ui/icons";
const CardsPanelPage = (props) => {
  const history = useHistory();

  const URL = "http://localhost:8181/api/cards/";
  const userInfoRedux = useSelector((state) => state.auth.userData);
  const [cardsArr, setCardsArr] = useState([]);
  const IsloggedInRedux = useSelector((state) => state.auth.loggedIn);
  const [userArr] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { handleBuyButtonClick, handleRemoveButtonClick } = props;

  useEffect(() => {
    axios
      .get("/cards/allCards")
      .then(({ data }) => {
        setCardsArr(data);
      })
      .catch((err) => {});
  }, []);

  const handleEditUser = (id) => {
    let newUser = userArr.find((item) => {
      return item._id === id;
    });

    setSelectedUser({ ...newUser });
  };

  const handleUpdateUser = (id) => {
    let newCardsArr = cardsArr.filter((item) => item !== item._id);
    setCardsArr(newCardsArr);
    axios.get("/cards/allCards").then(({ data }) => {
      setCardsArr(data);
      setSelectedUser(null);
    });
  };

  const handleDeleteCard = (id) => {
    axios.delete(`${URL}${id}`).then((res) => {
      const newCardsArr = cardsArr.filter((item) => item._id !== id);
      setCardsArr(newCardsArr);
    });
  };
  function itemSortHtL() {
    const parsePrice = (x) => parseFloat(x.replace(/^\$/, "")) || 0;
    const sortedStudios = cardsArr
      .slice()
      .sort((a, b) => parsePrice(b.phone) - parsePrice(a.phone));
    setCardsArr(sortedStudios);
  }
  function itemSortLtH() {
    const parsePrice = (x) => parseFloat(x.replace(/^\$/, "")) || 0;
    const sortedStudios = cardsArr
      .slice()
      .sort((a, b) => parsePrice(a.phone) - parsePrice(b.phone));
    setCardsArr(sortedStudios);
  }
  return (
    <div>
      <NikeStore />
      <div style={{ marginLeft: "2%" }}>
        <h4>Sort by:</h4>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            onClick={itemSortHtL}
          />
          <label class="form-check-label" for="flexRadioDefault1">
            {" "}
            Price(High-Low)
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            onClick={itemSortLtH}
          />
          <label class="form-check-label" for="flexRadioDefault2">
            Price(Low-High)
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="row row-cols-1 row-cols-md-5 g-5">
        {cardsArr.map((item, index) => {
          return (
            <Fragment>
              <div className="col">
                <Carousel
                  className="main-slide"
                  interval={5000}
                  showStatus={false}
                  dynamicHeight={true}
                  showThumbs={false}
                  showArrows={false}
                  showIndicator={false}
                >
                  <div className="image">
                    <img
                      style={{ textAlign: "center" }}
                      src={item.image}
                      className="card-img-top "
                      alt="..."
                    />
                  </div>
                  <div className="image">
                    <img
                      style={{ textAlign: "center" }}
                      src={item.image1}
                      className="card-img-top "
                      alt="..."
                    />
                  </div>
                  <div className="image">
                    <img
                      style={{ textAlign: "center" }}
                      src={item.image2}
                      className="card-img-top "
                      alt="..."
                    />
                  </div>
                  <div className="image">
                    <img
                      style={{ textAlign: "center" }}
                      src={item.image3}
                      className="card-img-top "
                      alt="..."
                    />
                  </div>
                </Carousel>
                <div style={{ textAlign: "center" }} className="card-body ">
                  <h5 style={{ textAlign: "center" }} className="card-title">
                    {item.name}
                  </h5>

                  <h6
                    style={{ textAlign: "center" }}
                    className="card-subtitle mb-2 font-bolder"
                  >
                    ${item.phone}
                  </h6>
                </div>
                {props.userIDCard === props.userIDLoggedIn &&
                userInfoRedux.biz === true &&
                IsloggedInRedux === true ? (
                  <div
                    style={{ justifyContent: "space-between", display: "flex" }}
                    className="card-footer"
                  >
                    <Button
                      variant="outlined"
                      color="error"
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={handleEditUser}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => handleDeleteCard(item._id)}
                    >
                      Delete
                    </Button>
                  </div>
                ) : (
                  <CardActions
                    disableSpacing
                    style={{
                      justifyContent: "space-between",
                      margin: "0 auto",
                      width: "50%",
                      display: "flex",
                    }}
                    color="secondary"
                  >
                    <IconButton
                      color="secondary"
                      aria-label="Add to Cart"
                      onClick={() => {
                        handleRemoveButtonClick(item);
                      }}
                    >
                      <RemoveShoppingCart />
                    </IconButton>
                    <IconButton
                      to="/cart"
                      aria-label="Show cart items"
                      color="secondary"
                      className="cart"
                      onClick={() => {
                        handleBuyButtonClick(item);
                      }}
                    >
                      <AddShoppingCart />
                    </IconButton>
                  </CardActions>
                )}
              </div>

              {userInfoRedux._id === item.userID &&
              IsloggedInRedux === true &&
              selectedUser !== null ? (
                <CardUpdate
                  name={item.name}
                  description={item.description}
                  phone={item.phone}
                  image={item.image}
                  id={item._id}
                  onUpdateUser={handleUpdateUser}
                ></CardUpdate>
              ) : (
                ""
              )}
            </Fragment>
          );
        })}
      </div>
      {userInfoRedux.biz === true && IsloggedInRedux === true && (
        <button
          style={{
            display: "flex",
            margin: "0 auto",
            marginTop: "10px",
          }}
          type="button"
          className="btn btn-secondary mb-2 mb-lg-0 btn-lg"
          onClick={() => history.push("/cardregister")}
        >
          Add a New Card
        </button>
      )}
    </div>
  );
};

export default CardsPanelPage;
