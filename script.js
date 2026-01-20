const Dude_Types = ["bard","basic","cleric","frankendude","ghost","knight","medic","necromancer","ninja","paladin","samurai","spartan","vampire","viking","warlock","wizard","zombie"]
const Relic_Types = ["ab_roller","ancient_sword","bamboo_practice","battle_standard","bean_burrito","black_sheep","bloody_talisman","bone_axe","bonfire","bony_backhand","caboose","caged_tiger","calcium_pills","captains_hat","death_rattle","dog_tag","dudeplicator","fairy_ring","false_fangs","flaming_skull","frenzy_stone","gravestone","grog","hachimaki","half_full_glass","healthcare","helmet","hidden_daggers","katana_sharpener","keep_calm_poster","knucklebones","leather_bracer","lieutenant_sigil","liquid_courage","living_hand","living_will","loaded_dice","lokis_arm","loyalty_card","mobius_strip","motivational_poster","naginata","necronomicon","odin_statue","parry_buckler","pumpkin_latte","purple_heart","r_aspis","r_bass_drum","r_bokken","r_cosmic_geode","r_dancing_shoes","r_dory","r_emergency_ring","r_false_face","r_guitar_pick","r_heart_boxers","r_ion_storm","r_jazz_flute","r_mana_collector","r_marrow_scooper","r_memento_mori","r_metronome","r_overcharged_amp","r_requiem","r_ring_of_shielding","r_sequined_vest","r_snapback_sneakers","r_tuning_fork","r_valkyrie_amulet","ritual_dagger","rotting_steak","runic_tattoo","sewing_kit","shield_spikes","smelling_salts","tosei_gusoku","tower_shield","unit_tattoo","wakizashi","warhorn","winged_shoes","wolfskin_cloak"];
const Enemy_Types = ["bee","big_bee","duck_sized_horse","canada_goose","duck","feral_hog","goat","goose","gorilla","gorilla_silverback","honey_badger","horse","horse_sized_duck","horse_stallion","horse_unicorn","mallard_duck","polar_bear","ram","rat","rat_king","toddler","wolf","wolf_alpha"];









let saveString = ","


function main(){
    for(d in Dude_Types)
    {
        let option = document.createElement("option");
        option.innerText = Dude_Types[d];
        document.getElementById("add-dude-type").appendChild(option);
    }
    document.getElementById("save-file").addEventListener("focus", () => document.getElementById("save-file").select());
}//main

function copy(){
    navigator.clipboard.writeText(document.getElementById("save-file").value);
}

function updateString(){
    document.getElementById("save-file").value = JSON.stringify(saveOBJ)
}//updateString

function updateCash(){
    saveOBJ.cash = document.getElementById("cash").value;
}

function readSave(){

    saveString = document.getElementById("save-file").value
    saveOBJ = JSON.parse(saveString);

    document.getElementById("cash").value = saveOBJ.cash;
    loadDudes();
    loadMatches();
    loadRelics();

    let table = document.createElement("table");
    table.style.border = '1px solid black';

    const tr = table.insertRow();
    tr.innerHTML ="";


    //showTable(saveOBJ, table);
    document.getElementById("file-content").appendChild(table);
}//readSave



function showTable(obj, table, i=-1){
    for(key in obj){

        const tr = table.insertRow();
        tr.insertCell().appendChild(document.createTextNode(key));

        if(typeof(obj[key]) != "object" || obj[key].length>=0){
            if(obj[key].length>=0 && typeof(obj[key]) != "string"){
                if(i>=0) console.log("   ".repeat(i)+key, obj[key].length, obj[key], "not a stirng")
                let itable = document.createElement("table");
                showArray(obj[key],itable, key);
                tr.insertCell().appendChild(itable);
            }else{
                if(i>=0) console.log("   ".repeat(i)+key, obj[key]);

                const newElement = document.createElement("input")
                newElement.type = "text";
                newElement.value = obj[key];
                newElement.id = key;
                tr.insertCell().appendChild(newElement);
            }

        }else{
            
            if(i>=0) console.log("   ".repeat(i)+key, typeof(obj[key]),Object.keys(obj[key]).length);
            
            if(Object.keys(obj[key]).length == 0){
                const newElement = document.createElement("div")
                
                newElement.innerText = "empty";
                newElement.id = key;
                tr.insertCell().appendChild(newElement);
            }else{

                let itable = document.createElement("table");
                showTable(obj[key],itable,i>=0 ? i+1 : -1);
                tr.insertCell().appendChild(itable);
            }

        }
        
    }
}//showTable

function showArray(arr, table, key){
    for(i in arr){
       // console.log("show array",arr[i]);
        const tr = table.insertRow();
        tr.insertCell().appendChild(document.createTextNode(arr[i]));
    }
}//showArray


/*


//      Dude functions


*/

function loadDudes(){
    showDudes();
}//loadDudes

function newDudeID(){
    let num = Math.round(Math.random()*5000000 );
    if(Object.keys(saveOBJ.dudes).includes(num.toString())){
        return newDudeID();
    }else{
        return num;
    }
}//getDudeID

function addDudeInput(){
    let type = document.getElementById("add-dude-type").value;
    let num = document.getElementById("add-dude-num").value;
    addDude(type, num);
}//addDudeInput


function addDude(dude, num){
    let count=0;
    for(count=0; count<num; count++)
    {
        let dudeID = newDudeID();
        saveOBJ.dudes[dudeID] = {type:dude, knockout_rounds: 0, hp_percent: 1};
    }
    showDudes();
}//addDude

function removeDudeInput(){
    let type = document.getElementById("add-dude-type").value;
    let num = document.getElementById("add-dude-num").value;

    removeDude(saveOBJ, type, num);
}//remooveDudeInput

function removeDude(obj, dude, num){
    let rCount = 0;
    if(!countDudes()[dude]){
        window.alert("There are no "+ dude + " dudes available to remove");
    }else{
        for(d in obj.dudes){
            if(obj.dudes[d].type == dude){
                delete obj.dudes[d];
                rCount++;
                if(rCount>=num) break;
            }
        }
    }
    showDudes();
}//removeDude

function clearDudeKnockouts(){
    for(let d in saveOBJ.dudes){
        saveOBJ.dudes[d].knockout_rounds = 0;
    }
}

function countDudes(){
    let doods={};
    for(i in saveOBJ.dudes){
        if(doods[saveOBJ.dudes[i].type]){
            doods[saveOBJ.dudes[i].type]+=1;
        }else{
            doods[saveOBJ.dudes[i].type] = 1;
        }
    }
    return doods;
}//countDudes

function showDudes(){
    let doods = countDudes();
    let doodsList = document.getElementById("dude-list");
    let msg = ""
    for(d in doods){
        msg += (d+" "+doods[d]+"\n");
    }
    doodsList.innerText = msg;
    //window.alert(msg);

}//showDudes


/*


//      Match functions


*/

function loadMatches(){
    let matchSelector = document.getElementById("match-select");
    matchSelector.innerHTML = ""
    for(m in saveOBJ.matchups){
        let option = document.createElement("option");
        option.innerText = m;
        matchSelector.appendChild(option)
    }
    showMatch();
}//loadMatches

function addMatchInput(){
    let m = {
			"arena_modifiers":[],
			"week":6001.0,
			"challenge":true,
			"enemies":{
				"toddler":1.0
			}
		}
    saveOBJ.matchups.push(m)
    loadMatches();
}//addMatchInput

function removeMatchInput(){

    removeMatch(saveOBJ,id);
    loadMatches();
}//removeMatchInput

function removeMatch(obj, id){
    obj.matchups.splice(id,1);
}//removeMatch

function updateMatchInput(){
}//updateMatchInput



function addEnemy(enemy_key="bee",retry=0){
    let mID = document.getElementById("match-select").value
    
    if(!(enemy_key in saveOBJ.matchups[mID].enemies)){
        saveOBJ.matchups[mID].enemies[enemy_key]=1;
        return true;
    }else{
        if(retry >= 0){
            //console.log(retry, Enemy_Types[retry], addEnemy(Enemy_Types[retry],retry+1))
            addEnemy(Enemy_Types[retry],retry+1)
        }
    }

    
    loadMatches();
}//addEnemy

function removeEnemy(enemy_key){
    let mID = document.getElementById("match-select").value
    if(enemy_key){
        delete saveOBJ.matchups[mID].enemies[enemy_key];
    }else{
        if(Object.keys(saveOBJ.matchups[mID].enemies).length > 1){
            delete saveOBJ.matchups[mID].enemies[Object.keys(saveOBJ.matchups[mID].enemies).at(-1)];
        }
        
    }
    
    loadMatches();
}//removeEnemy


const Enemy_Types_Select = document.createElement("select");
for(e in Enemy_Types){
    let opt_e = document.createElement("option")
    opt_e.innerText = Enemy_Types[e];
    Enemy_Types_Select.appendChild(opt_e);
}

function showMatch(){

    let mID = document.getElementById("match-select").value;
    let mInfo = "";
    let match = saveOBJ.matchups[mID]

    document.getElementById("match-week-num").value = match.week;

    document.getElementById("match-challenge").checked = match.challenge;

    let enemies = document.getElementById("match-enemies");
    enemies.innerHTML = "Enemies: ";

    let matchAddEnemy = document.createElement("button");
    matchAddEnemy.innerText = "add";
    matchAddEnemy.onclick = function (){
        addEnemy();
        loadMatches();
    }

    let matchRemoveEnemy = document.createElement("button");
    matchRemoveEnemy.innerText = "remove";
    matchRemoveEnemy.onclick = function (){
        removeEnemy();
        loadMatches();
    }

    enemies.appendChild(matchAddEnemy);
    enemies.appendChild(matchRemoveEnemy);
    enemies.appendChild(document.createElement("br"))

    for(e in match.enemies){
        
        let e_select = Enemy_Types_Select.cloneNode(true);
        e_select.id = "match-enemies-"+e+"-select";
        e_select.value = e;
        e_select.onchange = function (){
            
            let new_enemy = this.value;
            removeEnemy(this.id.split("-")[2]);
            addEnemy(new_enemy);
            loadMatches();
        }

        let e_num = document.createElement("input");
        e_num.id = "match-enemies-"+e+"-select";
        e_num.type = "number";
        e_num.value = match.enemies[e]
        
        enemies.appendChild(e_select);
        enemies.appendChild(e_num);
        enemies.appendChild(document.createElement("br"));
    }
    
}//showMatchesInput


/*

        Relic Functions

*/

const Relic_Select = document.createElement("select");
for(r in Relic_Types){
    let opt_r = document.createElement("option")
    opt_r.innerText = Relic_Types[r];
    Relic_Select.appendChild(opt_r);
}


//
//
///
//
//  need to modify relic order list?
//
//
//
function loadRelics(){
    let relicDiv = document.getElementById("relic-list")
    relicDiv.innerHTML = "Relic List "
    const Relic_Select = document.createElement("select");
    Relic_Select.id = "relic-select"
    for(let r in Relic_Types){
        let opt_r = document.createElement("option")
        opt_r.innerText = Relic_Types[r];
        if(!(Relic_Types[r] in saveOBJ.relics_owned)){
            Relic_Select.appendChild(opt_r);
        }
    }
    relicDiv.appendChild(Relic_Select);


    let relicAdd = document.createElement("button");
    relicAdd.innerText = "Add";
    relicAdd.onclick = function () {
        saveOBJ.relics_owned[document.getElementById("relic-select").value] = 1;
        saveOBJ.relic_order.push(document.getElementById("relic-select").value)

        loadRelics();
    }
    relicDiv.appendChild(relicAdd);
    relicDiv.appendChild(document.createElement("br"));

    for(let r in saveOBJ.relics_owned){
        let relic_element = document.createElement("button");
        relic_element.innerText = r;
        relic_element.onclick = function () {
            delete saveOBJ.relics_owned[this.innerText];
            console.log(this.innerText)
            
            saveOBJ.relic_order.splice(saveOBJ.relic_order.indexOf(this.innerText),1);
            loadRelics();
        }
        relicDiv.appendChild(relic_element);
        relicDiv.appendChild(document.createElement("br"))
    }


}


