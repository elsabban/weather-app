console.log('js file is loaded')



const weatherForm = document.querySelector('form')
const inpt = document.querySelector('input')
const show1 = document.querySelector('.show1')
const show2 = document.querySelector('.show2')

weatherForm.addEventListener('submit' , (e) => {
      e.preventDefault()
     
      
      const valuee = inpt.value
       show1.textContent = 'loading ...'
      fetch('/weather?address=' + valuee).then((response)=> {
     response.json().then((data) => {
        if(data.error) {
            show1.textContent = data.error
        }else {
            show1.textContent = data.location
            show2.textContent = data.weather
        }
    }) 
})
      
}) 
