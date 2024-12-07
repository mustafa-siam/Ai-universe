const loadData=async()=>{
    const res=await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data=await res.json();
    const tools=data.data.tools;
    console.log(tools)
    displaytool(tools)
}
let issee=false;
let displaytool=(tools)=>{
    let aicontainer=document.getElementById("ai-container");
    aicontainer.textContent=" ";
    console.log(tools.length);
    if(issee===false){
      tools=tools.slice(0,9);
    }
    else{
      let seemore=document.getElementById("see-more");
      seemore.classList.add('hidden')
    }
    tools.forEach(tool => {
        let aicard=document.createElement('div');
        aicard.classList='card bg-base-100 shadow-xl aichat';
        aicard.innerHTML=`
        <figure class="px-10 pt-10">
                  <img
                    src="${tool.image}"
                    alt="Shoes"
                    onerror="this.src='jasper.jpeg'"
                    class="rounded-xl" />
                </figure>
                <div class="card-body">
                  <h2 class="card-title text-2xl font-semibold">Features</h2>
                  <ol type="1">
                     <li>${tool.features[0]}</li>
                     <li>${tool.features[1]}</li>
                     <li>${tool.features[2]}</li>
                  </ol>
                 <div class="border-[1px] border-dashed border-[#11111133] w-full"></div>
                 <h2 onclick="handledetails('${tool.id}')" class="text-2xl font-semibold ">${tool.name}</h2>
                  <div class="flex gap-2">
                    <img src="Vector.png" alt="">
                    <p class="text-base">${tool.published_in}</p>
                  </div>
                </div>
              </div>
        `;
        aicontainer.appendChild(aicard);
    });
}
const handlesee=()=>{
  loadData();
  issee=true;
}
const handledetails=async(id)=>{
  const res=await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
  const details=await res.json();
  const detail=details.data;
  showdetail(detail)
}
const showdetail=(detail)=>{
   console.log(detail);
   let seecontainer=document.getElementById('see-container');
   seecontainer.innerHTML=`
        <div class="outline outline-2 outline-[#EB5757] rounded-md p-9">
            <h1 class="text-2xl font-semibold pb-5">${detail.description}</h1>
            <div class="flex flex-col sm:flex-row justify-between items-center">
                <p class="text-base  text-center font-extrabold text-[#03A30A]">${detail.pricing[0].price}<br>${detail.pricing[0].plan}</p>
                <p class="text-base text-center font-extrabold text-[#F28927]">${detail.pricing[1].price}<br>${detail.pricing[1].plan}</p>
                <p class="text-base text-center font-extrabold text-[#EB5757]">${detail.pricing[2].price}<br>${detail.pricing[2].plan}</p>
            </div>
            <div class="flex flex-col sm:flex-row justify-between items-center pt-5">
                <div>
                    <h1 class="text-2xl  font-semibold">Features</h1>
                    <ul class="list-disc pl-5">
                        <li class="text-base font-normal">${detail.features[1].feature_name}</li>
                        <li class="text-base font-normal">${detail.features[2].feature_name}</li>
                        <li class="text-base font-normal">${detail.features[3].feature_name}</li>
                    </ul>
                </div>
                <div>
                    <h1 class="text-2xl  font-semibold">Integrations</h1>
                    <ul class="list-disc pl-5">
                        <li class="text-base font-normal">${detail.integrations[0]}</li>
                        <li class="text-base font-normal">${detail.integrations[1]}</li>
                        <li class="text-base font-normal">${detail.integrations[2]}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="flex flex-col  justify-center items-center">
             <div class="relative">
            <img src="${detail.image_link[0]}" alt="Image"class='h-full' onerror="this.src='jasper.jpeg'">
             <div class="absolute top-2 right-2 text-white bg-[#EB5757] px-3 rounded-lg">${detail.accuracy.score*100}% accuracy</div>
            </div>
            <h1 class="text-2xl  font-semibold py-5">${detail.input_output_examples[0].input}</h1>
            <p class="text-base font-semibold text-center">${detail.input_output_examples[0].output}</p>
        </div>
   `;
   show_modal.showModal();
}

loadData();