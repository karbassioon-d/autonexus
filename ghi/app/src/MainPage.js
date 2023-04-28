function MainPage() {
  return (
    <div className="d-flex flex-column px-4 py-5 my-5 text-center justify-content-center align-items-center" style={{height:"80vh"}} >
      <img className="mb-4" style={{width:"70%"}} src={process.env.PUBLIC_URL + '/autonexus-high-res-black.png'}/>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Introducing the ultimate solution for automobile dealership management - <em>where precision meets efficiency</em>
        </p>
      </div>
    </div>
  );
}

export default MainPage;
