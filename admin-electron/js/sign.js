let signAPI =
  "http://localhost/e-commerce-team-project/server/api/sign/signin.php";

const signIn = () => {
  return `<div class="sign-container " id='sign-in-container'>
      <h1>Sign in to your account</h1>
      <div class="inputs-container">
        <input placeholder="Email" id='mail' />
        <input placeholder="Password" id='pass'/>
      </div>
      <button class="sign-btn" id='sign-in-btn'>Sign In</button>
      </div>
      </div>`;
};

// rendering sign page if no user
if (JSON.parse(localStorage.getItem("user"))) {
  document.getElementById("main-container").classList.remove("display-none");
  document.getElementById("sign-container").classList.add("display-none");
} else {
  document.getElementById("main-container").classList.add("display-none");
  document.getElementById("sign-container").classList.remove("display-none");
  document.getElementById("sign-body").innerHTML = signIn();
}

// on clicking the sign in button
document.getElementById("sign-in-btn").onclick = () => {
  var params = new URLSearchParams();
  params.append("email", document.getElementById("mail").value);
  params.append("password", document.getElementById("pass").value);

  axios.post(signAPI, params).then((res) => {
    if (res.data.user_type_id == 0) {
      document
        .getElementById("main-container")
        .classList.remove("display-none");
      document.getElementById("sign-container").classList.add("display-none");
      localStorage.setItem("user", JSON.stringify(res.data));
    }
  });
};
