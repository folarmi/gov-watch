import Nigeria from "@react-map/nigeria";

const Test = () => {
  return (
    <div className="flex items-center justify-center">
      <Nigeria
        // onSelect={toast}
        size={1600}
        hoverColor="#008000"
        strokeColor="#008000"
        selectColor="#008000"
        strokeWidth={1}
        type="select-single"
        hints
        onSelect={(state: string) => console.log(state)}
      />
    </div>
  );
};

export default Test;

// const recursiveSum = (arr) => {
//   if (arr.length === 1) return arr[0]
//   return arr[0] + recursiveSum(arr.slice(1))
// }

// const recursiveSumTwo = (arr) => {
//   if (arr.length === 0) return 0;
//   return arr[0] + recursiveSum(arr.slice(1));
// }

// // console.log(recursiveSum([2,4,6]))
// // console.log(recursiveSumTwo([2,4,6]))

// const countNumberOfItems = (arr) => {
//   if (arr.length === 1) return 1
//   return 1 + countNumberOfItems(arr.slice(1))

// }

// console.log(countNumberOfItems([2,4]))

// const quickSort = (arr) => {
//   if (arr.length < 2) return arr
//   else {
//       let pivot = arr[0]
//       let less = arr.slice(1).filter(item => item <= pivot)
//       let greater = arr.slice(1).filter(item => item > pivot)
//   return [...quickSort(less), ...quickSort(greater) , pivot]
//   }
// }

// const multiplication = (array) => {
//   let result = []
//   for (let i = 0; i < array.length; i++){
//     const row = []
//     for (let j = 0; j < array.length; j++){
//         row.push(array[i] * array[j])
//     }
//     result.push(row)
//   }
//   return result
// }

// console.log(multiplication([2,3,7,8,10]))

// {
//   "publicId": "string",

//   "firstName": "string",
//   "lastName": "string",
//   "email": "user@example.com",
//   "bio": "string",
//   "socialMediaLink": "string",
//   "image": "string",

//   "phoneNumber": "string",

//   "otherInformation": "string",
//   "lastModifiedBy": "string",
//   "ward": "string",
//   "lga": "string",
//   "lcda": "string",
//   "state": "string",
//   "organizationName": "string",
//   "isOrganization": true,
//   "country": "string",
// }

// let graphObject = {
//   you:["alice","bob","claire"],
//   bob:["anuj","peggy"],
//   alice:["peggy"],
//   claire:["thom","jonny"],
//   anuj:[],
//   peggy:[],
//   thom:[],
//   jonny:[]
// }

// let you = ["alice","bob","claire"]

// const breadthFirstSearch = (name) => {
//   let deque = []
//   deque.push(name)
//   let searched = []

//   while (deque.length !== 0) {
//       let firstpersonOnTheQueue = deque.shift()
//       if (!searched.includes(firstpersonOnTheQueue)) {
//           if (personIsSeller(firstpersonOnTheQueue)) {
//               console.log(`${firstpersonOnTheQueue} is a mango seller`)
//               return true
//           } else {
//               // deque.push(graphObject[firstpersonOnTheQueue])
//             deque =  deque.concat(graphObject[firstpersonOnTheQueue])
//               searched.push(firstpersonOnTheQueue)
//           }
//       }
//   }
//   return false

// }

// const personIsSeller = (name) => {
//   return name.slice(-1) === 'm'
// }

// console.log(breadthFirstSearch("you"))
