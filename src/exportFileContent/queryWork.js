// export const appJsWork = `
// import React, { Component } from 'react';

// class App extends Component {
//   state = {
//     isSignIn: true,
//     username: '',
//     password: '',
//     passwordAgain: '', // Added the missing state variable
//   };

//   handleChange = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     if (this.state.isSignIn) {
//       // Sign in
//     } else {
//       // Sign up
//     }
//   };

//   render() {
//     return (
//       <div>
//         <h1>Sign In or Sign Up</h1>
//         <div>
//           {this.state.isSignIn ? (
//             <div>
//               <h2>Sign In</h2>
//               <form onSubmit={this.handleSubmit}>
//                 <input
//                   type="text"
//                   name="username"
//                   value={this.state.username}
//                   onChange={this.handleChange}
//                 />
//                 <input
//                   type="password"
//                   name="password"
//                   value={this.state.password}
//                   onChange={this.handleChange}
//                 />
//                 <button>Sign In</button>
//               </form>
//             </div>
//           ) : (
//             <div>
//               <h2>Sign Up</h2>
//               <form onSubmit={this.handleSubmit}>
//                 <input
//                   type="text"
//                   name="username"
//                   value={this.state.username}
//                   onChange={this.handleChange}
//                 />
//                 <input
//                   type="password"
//                   name="password"
//                   value={this.state.password}
//                   onChange={this.handleChange}
//                 />
//                 <input
//                   type="password"
//                   name="passwordAgain"
//                   value={this.state.passwordAgain}
//                   onChange={this.handleChange}
//                 />
//                 <button>Sign Up</button>
//               </form>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
// `;
