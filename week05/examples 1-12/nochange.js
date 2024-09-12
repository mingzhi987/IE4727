function ComputeCost(){
    var french=document.getElementById("french").value;
    var hazelnut=document.getElementById("hazelnut").value;
    var columbian=document.getElementById("columbian").value;

//Compute the cost

    document.getElementById("cost").value = totalCost = french * 3.49 + hazelnut * 3.95 + columbian * 4.59;
}