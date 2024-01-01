import { Form, redirect } from "react-router-dom";
import "./SignUp.css"
const SignUp = () => {

  return (
    <center className="centerCss">
      <Form method="POST" action="signUpAction">
        <div className="col-md-3">
            <input type="text" name="userId" className="form-control" id="userId" placeholder="First Name" />
        </div>
        <br></br>
        <div className="col-md-3">
            <input type="text" name="userId" className="form-control" id="userId" placeholder="Last Name" />
        </div>
        <br></br>
        <div className="col-md-3">
            <input type="text" name="userId" className="form-control" id="userId" placeholder="Email" />
        </div>
        <br></br>
        <div className="col-md-3">
            <input type="text" name="userId" className="form-control" id="userId" placeholder="Password" />
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary"> Sign Up</button>
    </Form>
    </center>
  );
};

export async function signUpAction(data) {
  const formData = await data.request.formData();
  const postData = Object.fromEntries(formData);
  postData.tags = postData.tags.split(" ");
  console.log(postData);

  fetch("http://localhost:3000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  })
    .then((res) => res.json())
    .then((post) => {
      console.log(post);
    });

  return redirect("/");
}

export default SignUp;
