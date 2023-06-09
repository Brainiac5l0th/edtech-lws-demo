> Note: This was my final project for **`think in redux way batch-2`**. You can checkout my **overall course _Report_** [LINK](https://learnwithsumit.com/certificates/verify/LWSCTXN-QPAD26IV)

## Technologies Used:
**`React`, `Redux`, `RTK-Query`, `JSON-server`, `JSON-server-auth`, `react-router-dom`, `react-loader-spinner`**
## To run this Project:

#### `Download/pull` the `backend branch` from this repository and hit command :

```
npm install
npm start
```

## Go to _[website](https://shawon-talukder-final-assignment.netlify.app/)_

## To Access:

```

"/admin" routes ->
email    : admin@learnwithsumit.com
password : lws@123456

"/student" routes ->
email    : shawon@learnwithsumit.com
password : lws@123456

```

> You can also **create _user/student_** using `/register` route, but there will be single admin only.

## যা যা করা হয়েছেঃ

:heavy_check_mark: প্রোজেকটি রিয়াক্ট এ কনভার্ট করে নিয়ে, এডমিন এর লগিন এবং লগআউট এর ফিচার ইমপ্লিমেন্ট করতে হবে।
[ :heavy_check_mark: ] প্রথম অবস্থায় Index পেজ হিসেবে থাকবে Student Login পেজ।
[ :heavy_check_mark: ] Admin পেজ এর জন্যে admin রাউট ব্যবহার করতে হবে। যেমনঃ /admin, /admin/assignment

:heavy_check_mark: Student Login, Student Registration ইমপ্লিমেন্ট করতে হবে আপনাদের। Template দিয়ে দেয়া আছে। Admin এর জন্য কোন registration প্রয়োজন নেই। কারণ আমরা admin তৈরী করে দিয়েছি। আপনাদের কে শুধু admin login implement করতে হবে।

:heavy_check_mark: Dashboard এ Videos, Assignment, Quizzes এবং Assignment মার্ক এর জন্যে আলাদা পেজ তৈরি করতে হবে। নাম এবং টেমপ্লেটে দেয়া ইউজার ইন্টারফেস দেখে আশা করি বুঝে গেছেন কি করতে হবে।

:heavy_check_mark: Dashboard এর Videos পেজে গেলে -
[ :heavy_check_mark: ]পূর্বে এড করা ভিডিও গুলো লিস্ট আকারে আসবে
[ :heavy_check_mark: ]প্রত্যেকটি ভিডিওতে ডিলিট এবং এডিট বাটন থাকবে।
[ :heavy_check_mark: ]"Add Video" বাটনে ক্লিক করলে পপ-আপ বা অন্য পেজে নিয়ে গিয়ে ভিডিও এর Information গুলো কালেক্ট করতে হবে। উল্লেখ্য, আমরা আপনাদেরকে "Add Video" এর ইন্টারফেস দিয়ে দেইনাই, এটি আপনাকে নিজেকে করে নিতে হবে।ভিডিও এড করতে কি কি প্যারামিটার ব্যবহার করবেন, সেটি ডেটাবেজের 'videos' টেবিল থেকে বুঝে নিন।

:heavy_check_mark: Assignment পেজে গেলে -
[ :heavy_check_mark: ]যদি Assignment তৈরি করা থাকে তবে লিস্টে দেখাবে, অন্যথায় ফাঁকা দেখাবে
[ :heavy_check_mark: ]"Add Assignment" - এ ক্লিক করার পরের ইন্টারফেস আপনাকে হ্যান্ডেল করতে হবে
এখানে বাড়তি একটি ফিল্ড দিতে হবে, Assignment টা কোন ভিডিওতে থাকবে সেটি সিলেক্ট করার অপশন দিতে হবে।
অন্যান্য প্রোপার্টি এবং ডেটা স্ট্রাকচার বোঝার জন্যে, 'assignments' টেবিল টি দেখে নিন।
[ :heavy_check_mark: ]ধরুন, আপনি "Videos" এ একটি ভিডিও এড করলেন যার টাইটেল - "Debounce Function in JavaScript"। এখন এসাইনমেন্ট তৈরি করার সময় আপনি একটি Select Option দিবেন, যেখানে আগে এড করা ভিডিও গুলো থাকবে, তার মধ্যে যেটি সিলেক্ট করা হবে, এই এসাইনমেন্ট টি সেই ভিডিও এর নিচে দেখাবে।

:heavy_check_mark: Quizzes পেজে গেলে, একই ভাবে, কুইজের লিস্ট থাকবে, এবং কুইজ এড করতে পারবেন। এড করার সময় কোন ভিডিওর কুইজ এড করছেন, সেটিও Select করে দেয়ার অপশন দিতে হবে। কুইজের ইনপুট নেবার আগে, JSON Server এ দেয়া Data Structure ভাল করে বুঝে নিন।

:heavy_check_mark: AssignmentMark পেজে গেলে, Student-রা যেই যেই এসাইনমেন্ট জমা দিয়েছে, তার ডেটা টেবিলের মধ্যে দেখাবে। টেবিলে প্রথম অবস্থায়, মার্ক Input দেয়ার জায়গা থাকবে, মার্ক Input দিয়ে পাশের সবুজ টিক এ ক্লিক করলে, মার্ক আপডেট হয়ে যাবে এবং Input & সবুজ টিক এর পরিবর্তে শুধু কত মার্ক পেলো সেটি দেখা যাবে।

:heavy_check_mark: টেবিলের উপরে ছোট ৩ টা ব্যাজ আছে, প্রথম ব্যাজে মোট এসাইনমেন্ট এর সংখ্যা বসাতে হবে, Pending এ কত গুলো এসাইনমেন্ট মার্কিং করা বাকি আছে সেটি থাকবে এবং Mark Sent এ কত গুলো মার্ক Sent করা হয়েছে সেটি থাকবে।

:heavy_check_mark: Student এর লগিন রেজিস্ট্রেশন ফিচার Implement করতে হবে। স্টুডেন্ট লগিন করার পরে, Course Player পেজে নিয়ে যাবে।

:heavy_check_mark: এডমিন ড্যাশবোর্ড থেকে যেই ভিডিও গুলো এড করেছেন, সেই ভিডিও গুলো ডান পাশের Playlist এ নিয়ে এসে দেখাতে হবে। লিস্টের ভিডিও তে ক্লিক করলে ওই ভিডিও প্লে করাতে হবে।

:heavy_check_mark: যেই ভিডিও সিলেক্ট করা আছে, সেটিতে যদি এসাইনমেন্ট থাকে তাহলে, তাহলে এসাইনমেন্ট বাটন Show করবে।
[ :heavy_check_mark: ]এসাইনমেন্ট বাটন এ সেখানে ক্লিক করলে একটি Modal ওপেন হবে।
[ :heavy_check_mark: ]মোডালে কি কি ফিল্ড প্রয়োজন সেগুলোর জন্যে আপনি ডেটাবেজের Structure দেখে নিন।
[ :heavy_check_mark: ]একজন Student একবার Assginment সাবমিট করলে, পরবর্তিতে আর করতে পারবে না।
[ :heavy_check_mark: ] এসাইনমেন্ট এর মতো, "কুইজে অংশগ্রহণ করুন" এ ক্লিক করলে, কুইজ পেজে নিয়ে যাবে, সেখানে ওই ভিডিও এর কুইজ গুলো নিয়ে এসে দেখাবে।
[ :heavy_check_mark: ] কুইজ সাবমিট করলে সেটি ক্যাল্কুলেট হয়ে মার্ক লিডারবোর্ডে চলে যাবে।
[ :heavy_check_mark: ] কুইজ সাবমিট করলে তাকে লিডারবোর্ডে নিয়ে যাবে।
[ :heavy_check_mark: ] একজন Student একবার Quiz সাবমিট করলে, পরবর্তিতে আর করতে পারবে না।
:heavy_check_mark: লিডারবোর্ড এ ক্লিক করলে, লগিন করা ব্যাক্তি তার নিজের রেজাল্ট এবং সর্বোচ্চ মার্ক পাওয়া ২০ জনের রেজাল্ট দেখতে পারবে। এটির জন্যে 'assignmentMark' এবং 'quizMark' টেবিল থেকে Runtime এ ফ্রন্ট এন্ড এই মার্ক ক্যাল্কুলেট করে নিয়ে এসে দেখাতে হবে। সার্ভার থেকে ক্যাল্কুলেট করার প্রয়োজন নেই।
