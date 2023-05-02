function MainPage() {
  return (
    <div className="d-flex flex-column px-4 py-5 my-5 text-center justify-content-center align-items-center" style={{height:"80vh"}} >
      <video className="object-fit-cover" style={{zIndex:"1", left:"50", top:"70px", width:"100%", height:"92.5%", position:"absolute", objectFit:"cover"}} src={process.env.PUBLIC_URL + '/car-video.mp4'} autoPlay loop muted />
      <img className="mb-4" style={{width:"70%", zIndex:"2"}} src={process.env.PUBLIC_URL + '/autonexus-high-res-white.png'}/>
      <div className="col-lg-6 mx-auto" style={{zIndex:"2"}}>
        <p className="lead mb-4" style={{color:"white"}}>
          Introducing the ultimate solution for automobile dealership management - <em>where precision meets efficiency</em>
        </p>
      </div>
    </div>
  );
}

export default MainPage;
