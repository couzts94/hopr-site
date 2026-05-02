const supabase = window.supabase.createClient(
  "https://haajilrpwlhixolmrxno.supabase.co/rest/v1/",
  "sb_publishable_yCkfw5KNMyzkCGUaaZo1PA_jcQttJi_"
);

async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
}
async function addPost(text) {
  const user = await supabase.auth.getUser();

  await supabase.from("posts").insert([
    {
      content: text,
      user_id: user.data.user.id
    }
  ]);
}
async function loadPosts() {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  console.log(data);
}
function submitPost() {
  const text = document.getElementById("postInput").value;
  addPost(text);
}
loadPosts();

async function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
  } else {
    alert("Logged in!");
    loadPosts();
  }
}
