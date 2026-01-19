const Dude_Types = ["bard","basic","cleric","frankendude","ghost","knight","medic","necromancer","ninja","paladin","samurai","spartan","vampire","viking","warlock","wizard","zombie"]
const relic_types = ["tower_shield","unit_tattoo","death_rattle","r_aspis","dudeplicator","dog_tag","r_dory","motivational_poster","hidden_daggers","living_will","r_guitar_pick","pumpkin_latte","r_emergency_ring","r_mana_collector","r_sequined_vest","ancient_sword","lokis_arm","parry_buckler","loaded_dice","captains_hat","r_ion_storm","loyalty_card","r_tuning_fork","r_dancing_shoes","wolfskin_cloak","fairy_ring","mobius_strip","r_valkyrie_amulet","caged_tiger","winged_shoes","odin_statue","r_cosmic_geode","r_heart_boxers","battle_standard","r_snapback_sneakers","helmet","black_sheep","half_full_glass","r_requiem","smelling_salts","ab_roller","r_bass_drum","r_overcharged_amp","lieutenant_sigil","warhorn","r_jazz_flute","healthcare","caboose","bean_burrito","leather_bracer","r_metronome","grog","r_ring_of_shielding","keep_calm_poster","bonfire","bloody_talisman","runic_tattoo","r_false_face","liquid_courage","purple_heart","shield_spikes","naginata","bamboo_practice","tosei_gusoku","katana_sharpener","r_bokken","wakizashi","hachimaki","gravestone","flaming_skull","necronomicon","sewing_kit","r_memento_mori","r_marrow_scooper","bony_backhand","living_hand","ritual_dagger","knucklebones","bone_axe","rotting_steak","frenzy_stone","calcium_pills","false_fangs"];
const Enemy_Types = ["bee","big_bee","duck_sized_horse","canada_goose","duck","feral_hog","goat","goose","gorilla","gorilla_silverback","honey_badger","horse","horse_sized_duck","horse_stallion","horse_unicorn","mallard_duck","polar_bear","ram","rat_king","toddler","wolf","wolf_alpha"];









let saveString = ","


function main(){
    for(d in Dude_Types)
    {
        let option = document.createElement("option");
        option.innerText = Dude_Types[d];
        document.getElementById("add-dude-type").appendChild(option);
    }

}//main

function copy(){
    navigator.clipboard.writeText(document.getElementById("save-file").value);
}

function updateString(){
    document.getElementById("save-file").value = JSON.stringify(saveOBJ)
}//updateString



function readSave(){

    saveString = document.getElementById("save-file").value
    saveOBJ = JSON.parse(saveString);

    loadDudes();
    loadMatches();

    let table = document.createElement("table");
    table.style.border = '1px solid black';

    const tr = table.insertRow();
    tr.innerHTML ="";


    showTable(saveOBJ, table);
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


    mInfo+=("Enemies:\n");
    for(e in match.enemies){
        mInfo+=("   " + e + " - "+ match.enemies[e] + "\n");
    }
    
    document.getElementById("match-info").innerText = mInfo;
    
}//showMatchesInput


