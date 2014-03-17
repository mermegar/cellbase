var variantsContr = variantsModule.controller('variantsController', ['$scope', '$rootScope', 'mySharedService', 'CellbaseService', function ($scope, $rootScope, mySharedService, CellbaseService) {

    $scope.specie = mySharedService.variantsSpecie;
    $scope.chromSelected = [];
    $scope.regions = "20:32850000-32860000";
    $scope.listOfConseqTypes = [];
    $scope.snpIdFilter = "";
    $scope.conseqTypesFilter = [];

    $scope.typeOfData = "variants";

    $scope.chromNames = mySharedService.chromNames;

    $scope.init = function(){
        $scope.deselectAllChrom();
        $scope.deselectAllConseqTypeFilter();
        $scope.chromSelected = [];
        $scope.regions = "";
        $scope.listOfConseqTypes = [];
        $scope.snpIdFilter ="";
        $scope.conseqTypesFilter = [];
    };
    //comunicate that a is a new result
//    $scope.setResult = function (fromGV) {
//        mySharedService.broadcastVariantsNewResult($scope.chromSelected, $scope.regions, $scope.snpIdFilter, $scope.conseqTypesFilter, fromGV);
//    };
    $scope.newResult = function (fromGV) {
//        mySharedService.broadcastVariantsNewResult($scope.chromSelected, $scope.regions, $scope.snpIdFilter, $scope.conseqTypesFilter, fromGV);

        if($scope.snpIdFilter != ""){
            $scope.snpIdFilter = mySharedService.removeSpaces($scope.snpIdFilter);
        }
        else if($scope.regions!= ""){
            $scope.regions =  mySharedService.removeSpaces($scope.regions);
        }

        if ($scope.snpIdFilter == "" && $scope.conseqTypesFilter.length == 0 && $scope.chromSelected.length == 0 && $scope.regions == "") {
            alert("No data selected");
        }
        else {
            mySharedService.regionsAndChromosomesVariants = mySharedService.mergeChromosomesAndRegions($scope.chromSelected, $scope.regions, mySharedService.chromAllData);
//            $rootScope.$broadcast('variantsNewResult', fromGV);
            $scope.setResult(false);
        }



    };

    $scope.setSpecie = function(){
        $scope.specie = mySharedService.variantsSpecie;
        $scope.chromSelected = [];
        $scope.chromNames = mySharedService.chromNames;
    };
    $scope.addChrom = function (chrom) {
        var pos = $scope.chromSelected.indexOf(chrom);

        if (pos == -1) {
            $scope.chromSelected.push(chrom);
        }
        else {
            $scope.chromSelected.splice(pos, 1);
        }

        if($('#variants'+chrom).hasClass("btn-primary")){
            $('#variants'+chrom).removeClass("btn-primary");
        }
        else{
            $('#variants'+chrom).addClass("btn-primary");
        }
    };

    $scope.addConseqTypeFilter = function (conseqType) {
        var pos = $scope.conseqTypesFilter.indexOf(conseqType);

        if (pos == -1) {
            $scope.conseqTypesFilter.push(conseqType);
        }
        else {
            $scope.conseqTypesFilter.splice(pos, 1);
        }

        if($('#'+conseqType).hasClass("btn-primary")){
            $('#'+conseqType).removeClass("btn-primary");
        }
        else{
            $('#'+conseqType).addClass("btn-primary");
        }
    };

    $scope.selectAllChrom = function () {

        $('#variantsChromMultiSelect').children().addClass("btn-primary");

        for (var i in $scope.chromNames) {
            $scope.chromSelected.push($scope.chromNames[i]);
        }

//        $('#variantsChromMultiSelect').children().children().prop('checked', true);
//        for (var i in $scope.chromNames) {
//            $scope.chromSelected.push($scope.chromNames[i])
//        }
    };
    $scope.deselectAllChrom = function () {

        $('#variantsChromMultiSelect').children().removeClass("btn-primary");
        $scope.chromSelected = [];

//        $scope.chromSelected = [];
//        $('#variantsChromMultiSelect').children().children().prop('checked', false);
    };
    $scope.selectAllConseqTypeFilter = function () {

        $('#conseqTypeMultiSelect').children().addClass("btn-primary");
        for (var i in $scope.listOfConseqTypes) {
            $scope.conseqTypesFilter.push($scope.listOfConseqTypes[i]);
        }

//        $('#conseqTypeMultiSelect').children().children().prop('checked', true);
//        for (var i in $scope.listOfConseqTypes) {
//            $scope.conseqTypesFilter.push($scope.listOfConseqTypes[i]);
//        }
    };
    $scope.deselectAllConseqTypeFilter = function () {

        $('#conseqTypeMultiSelect').children().removeClass("btn-primary");
        $scope.conseqTypesFilter = [];

//        $scope.conseqTypesFilter = [];
//        $('#conseqTypeMultiSelect').children().children().prop('checked', false);
    };

    //-----------EVENTS---------------

    $scope.reload = function () {
        $scope.init();
        $scope.setSpecie();
        $scope.regions = "20:32850000-32860000";
        $scope.newResult();
        $scope.regions = "20:32850000-32860000";
    };

    $scope.clear = function () {
        $scope.init();
        $scope.setSpecie();
        $scope.clearAll();
    };


    $scope.$on('newSpecie', function () {

        if(mySharedService.variantsSpecie.shortName == "hsapiens" || mySharedService.variantsSpecie.shortName == "dmelanogaster"){

            $scope.init();
            $scope.setSpecie();

            if($scope.specie.shortName == "hsapiens"){
                $scope.regions = "20:32850000-32860000";
            }
            if($scope.specie.shortName == "dmelanogaster"){
                $scope.regions = "2L:12850000-12855000";
            }
            if($scope.specie.shortName == "cfamiliaris"){
                $scope.regions = "5:11850000-32950000";
            }

            $scope.setResult(false);

            if(mySharedService.variantsSpecie.shortName == "dmelanogaster"){
                //disable variation tab
                if(!$('#variantsGV').hasClass("disabled")){
                    $('#variantsGV').addClass("disabled");
                }
            }
            else{
                //enable variation tab
                if($('#variantsGV').hasClass("disabled")){
                    $('#variantsGV').removeClass("disabled");
                }
            }

        }

    });

    $scope.$on('variantsNewSpecieGV', function () {
        $scope.init();
        $scope.specie = mySharedService.variantsSpecieGV;
        $scope.chromNames = mySharedService.variantsChromNames;

        if($scope.specie.shortName == "hsapiens"){
            $scope.regions = "13:32889575-32889647";
        }
        if($scope.specie.shortName == "mmusculus"){
            $scope.regions = "1:18421973-18422045";
        }

        $scope.setResult(true);



        $scope.$apply();
//        $scope.setSpecie();
    });
    $scope.$on('variantsConseqTypes', function () {
        $scope.listOfConseqTypes = mySharedService.conseqTypes;
    });

    $scope.$on('variationsGV:regionFromGV', function (ev, event) {

        if(event.sender.species.text == mySharedService.variantsSpecie.longName){
            $scope.specie.longName = event.sender.species.text;
            $scope.regions = event.region.chromosome + ":" + event.region.start + "-" + event.region.end;
            $scope.setResult(true);

            if(!$scope.$$phase) {
                //$digest or $apply
                $scope.$apply();
            }
        }
    });
//    $scope.$on('variantsRegionGV', function () {
//        $scope.specie = mySharedService.variantsSpecieGV;
//        $scope.regions = mySharedService.regionFromGV;
//        $scope.setResult();
//        $scope.$apply();
//    });

    //tabs
    $scope.goToTab = function () {
        $(function () {
            $('#variantsTabs a:first').tab('show')
        })
        $('#variantsTabs a').click(function (e) {
            e.preventDefault()
            $(this).tab('show')
        })
    };


    //--------------------------------------------------
    //--------------------------------------------------
    //--------------------------------------------------


    $scope.toggleTree = [];
    $scope.snpData = {};
    $scope.paginationData = [];
    $scope.conseqTypes = [];

    $scope.firstVariantId = "";
    $scope.showAll = false;

    $scope.showVariantPanel = false;

    $scope.showTranscriptVarPanel = false;

    $scope.showPagination = false;
    $scope.firstPages = false;
    $scope.previousPage = false;
    $scope.nextPage = true;
    $scope.lastPages = true;
    $scope.paginationNumbers = [1, 2, 3];
    $scope.maxNumberPagination;
    $scope.numDataPerPage = 10;
    $scope.showPagination = false;
    $scope.lastPage = 1;
    $scope.disableFirstNumber = true;
    $scope.disableSecondNumber = false;
    $scope.disableThirdNumber = false;

    //========================Pagination==================================
    $scope.obtainPaginationData = function (page){
        $scope.lastPage = page;
        $scope.paginationData = [];


        if(typeof $scope.snpDataCache[page] == "undefined"){
            $scope.paginationData = CellbaseService.getAllSNPDataPaginated($scope.selectedSpecie.shortName, mySharedService.regionsAndChromosomesVariants,$scope.conseqTypesFilters,page);
            $scope.snpDataCache[page] = $scope.paginationData;

        }
        else{
            $scope.paginationData = $scope.snpDataCache[page];
        }



//        var ini = (page - 1) * $scope.numDataPerPage;
//        var variantId;

//        for (var i = ini; i < ini + $scope.numDataPerPage; i++) {
//            variantId = Object.keys($scope.snpData)[i];
//            if (Object.keys($scope.snpData)[i] != null) {
//                $scope.paginationData.push($scope.snpData[variantId]);
//            }
//        }
    };




    $scope.goToFirstPage = function () {
        $scope.paginationNumbers[0] = 1;
        $scope.paginationNumbers[1] = 2;
        $scope.paginationNumbers[2] = 3;

        $scope.firstPages = false;
        $scope.previousPage = false;
        $scope.nextPage = true;
        $scope.lastPages = true;

        $scope.collapseAllVariantsTree();
        $scope.disableAndEnablePaginationButtons(1);
//        $scope.obtainPaginationLimits(1);
        $scope.obtainPaginationData(1);
    };
    $scope.goToLastPage = function () {
        $scope.paginationNumbers[0] = $scope.maxNumberPagination - 2;
        $scope.paginationNumbers[1] = $scope.maxNumberPagination - 1;
        $scope.paginationNumbers[2] = $scope.maxNumberPagination;

        $scope.firstPages = true;
        $scope.previousPage = true;
        $scope.nextPage = false;
        $scope.lastPages = false;

        $scope.collapseAllVariantsTree();
        $scope.disableAndEnablePaginationButtons($scope.maxNumberPagination);
//        $scope.obtainPaginationLimits($scope.maxNumberPagination);
        $scope.obtainPaginationData($scope.maxNumberPagination);
    };
    $scope.goPreviousPage = function () {
        var page = $scope.lastPage - 1;

        $scope.firstPages = true;
        $scope.previousPage = true;
        $scope.nextPage = true;
        $scope.lastPages = true;

        if (page == 1) {
            $scope.firstPages = false;
            $scope.previousPage = false;

            $scope.paginationNumbers[0] = 1;
            $scope.paginationNumbers[1] = 2;
            $scope.paginationNumbers[2] = 3;
        }
        else if ($scope.paginationNumbers[0] != page && $scope.paginationNumbers[1] != page && $scope.paginationNumbers[2] != page) {
            $scope.paginationNumbers[0] = page - 2;
            $scope.paginationNumbers[1] = page - 1;
            $scope.paginationNumbers[2] = page;
        }
        $scope.collapseAllVariantsTree();
        $scope.disableAndEnablePaginationButtons(page);
//        $scope.obtainPaginationLimits(page);
        $scope.obtainPaginationData(page);
    };
    $scope.goNextPage = function () {
        var page = $scope.lastPage + 1;

        $scope.firstPages = true;
        $scope.previousPage = true;
        $scope.nextPage = true;
        $scope.lastPages = true;

        if (page == $scope.maxNumberPagination) {
            $scope.nextPage = false;
            $scope.lastPages = false;

            $scope.paginationNumbers[0] = page - 2;
            $scope.paginationNumbers[1] = page - 1;
            $scope.paginationNumbers[2] = page;
        }
        else if ($scope.paginationNumbers[0] != page && $scope.paginationNumbers[1] != page && $scope.paginationNumbers[2] != page) {
            $scope.paginationNumbers[0] = page;
            $scope.paginationNumbers[1] = page + 1;
            $scope.paginationNumbers[2] = page + 2;
        }

        $scope.collapseAllVariantsTree();
        $scope.disableAndEnablePaginationButtons(page);
//        $scope.obtainPaginationLimits(page);
        $scope.obtainPaginationData(page);
    };
    $scope.goToNumberPage = function (selectedPage) {
        if (!$scope.simplePagination) {
            if (selectedPage == $scope.maxNumberPagination) {
                $scope.nextPage = false;
                $scope.lastPages = false;
                $scope.firstPages = true;
                $scope.previousPage = true;
            }
            else if (selectedPage == 1) {
                $scope.firstPages = false;
                $scope.previousPage = false;
                $scope.nextPage = true;
                $scope.lastPages = true;
            }
            else {
                $scope.firstPages = true;
                $scope.previousPage = true;
                $scope.nextPage = true;
                $scope.lastPages = true;
            }
        }
        $scope.collapseAllVariantsTree();
        $scope.disableAndEnablePaginationButtons(selectedPage);
//        $scope.obtainPaginationLimits(selectedPage);
        $scope.obtainPaginationData(selectedPage);
    };
    $scope.disableAndEnablePaginationButtons = function (page) {
        if ($scope.paginationNumbers[0] == page) {
            $scope.disableFirstNumber = true;
            $scope.disableSecondNumber = false;
            $scope.disableThirdNumber = false;
        }
        else if ($scope.paginationNumbers[1] == page) {
            $scope.disableSecondNumber = true;
            $scope.disableFirstNumber = false;
            $scope.disableThirdNumber = false;
        }
        else {
            $scope.disableThirdNumber = true;
            $scope.disableSecondNumber = false;
            $scope.disableFirstNumber = false;
        }
    };
    $scope.obtainPaginationLimits = function (page) {
        $scope.lastPage = page;
        var ini = (page - 1) * $scope.numDataPerPage;
        $scope.paginationData = [];
        var variantId;

        for (var i = ini; i < ini + $scope.numDataPerPage; i++) {
            variantId = Object.keys($scope.snpData)[i];
            if (Object.keys($scope.snpData)[i] != null) {
                $scope.paginationData.push($scope.snpData[variantId]);
            }
        }
    };
    $scope.initPagination = function () {

        $scope.snpDataSize = CellbaseService.getCountSNPData($scope.selectedSpecie.shortName, mySharedService.regionsAndChromosomesVariants);

        $scope.maxNumberPagination = Math.ceil( $scope.snpDataSize / $scope.numDataPerPage);
//        $scope.maxNumberPagination = Math.ceil(Object.keys($scope.snpData).length / $scope.numDataPerPage);

        //  0 --> 10
//        if (Object.keys($scope.snpData).length <= $scope.numDataPerPage) {
        if ( $scope.snpDataSize <= $scope.numDataPerPage) {


//            for (var i in $scope.snpData) {
//                $scope.paginationData.push($scope.snpData[i]);
//            }
            $scope.showPagination = false;
        }
        // 11 --> 20
//        else if (Object.keys($scope.snpData).length <= ($scope.numDataPerPage * 2)) {
        else if ( $scope.snpDataSize  <= ($scope.numDataPerPage * 2)) {
            $scope.simplePagination = true;

//            for (var i = 0; i < $scope.numDataPerPage; i++) {
//                variantId = Object.keys($scope.snpData)[i];
//                if (Object.keys($scope.snpData)[i] != null) {
//                    $scope.paginationData.push($scope.snpData[variantId]);
//                }
//            }

            $scope.showPagination = true;
            $scope.lastPage = 1;

            $scope.disableFirstNumber = true;
            $scope.disableSecondNumber = false;
            $scope.disableThirdNumber = false;

            $scope.firstPages = false;
            $scope.previousPage = false;
            $scope.nextPage = false;
            $scope.lastPages = false;

            $scope.thirdNumber = false;
            $scope.paginationNumbers = [1, 2];
        }
        // 21 --> ...
        else {
            $scope.simplePagination = false;
            var variantId;

//            for (var i = 0; i < $scope.numDataPerPage; i++) {
//                variantId = Object.keys($scope.snpData)[i];
//                if (Object.keys($scope.snpData)[i] != null) {
//                    $scope.paginationData.push($scope.snpData[variantId]);
//                }
//            }

            $scope.firstPages = false;
            $scope.previousPage = false;
            $scope.nextPage = true;
            $scope.lastPages = true;

            $scope.thirdNumber = true;
            $scope.paginationNumbers = [1, 2, 3];
            $scope.showPagination = true;
            $scope.lastPage = 1;

            $scope.disableFirstNumber = true;
            $scope.disableSecondNumber = false;
            $scope.disableThirdNumber = false;
        }
    };


    $scope.clearAll = function(){
        $scope.showAll = false;
    };
//    $scope.clear = function () {
//        $scope.showVariantPanel = false;
//        $scope.showTranscriptVarPanel = false;
//        mySharedService.broadcastVariationsClear();
//    };


    $scope.setResult = function(fromGV){

        $scope.snpFilters = $scope.snpIdFilter;
        $scope.conseqTypesFilters = $scope.conseqTypesFilter;
        $scope.selectedSpecie = mySharedService.variantsSpecie;

        $scope.paginationData = [];

        $scope.snpDataCache = {};

        if ($scope.snpFilters.length != 0) {
            $scope.paginationData = CellbaseService.getVariantsDataById($scope.selectedSpecie.shortName, $scope.snpFilters);  //obtener los datos

            $scope.checkSNPFilter($scope.snpFilters);
        }
        else{
            $scope.paginationData = CellbaseService.getAllSNPDataPaginated($scope.selectedSpecie.shortName, mySharedService.regionsAndChromosomesVariants, [],1);

            $scope.snpDataCache[1] = $scope.paginationData;
        }

//        $scope.numResults = Object.keys($scope.paginationData).length;


        if($scope.paginationData.length != 0){

            console.log($scope.regions);

            $scope.initPagination();
//            $scope.clear();

            $scope.toggleTree = [];


            for(var i=0;i< 10; i++){
                $scope.toggleTree.push(false);
            }

            $scope.showAll = true;
            $scope.firstVariantId = $scope.paginationData[0].id;
            $scope.lastDataShow = $scope.firstVariantId;
            $scope.selectedVariant = CellbaseService.getVariantsDataById($scope.selectedSpecie.shortName, $scope.lastDataShow)[0];
            $scope.showVariant($scope.paginationData[0].id, 0, fromGV);


//            $scope.showSelectedVariant($scope.paginationData[0].id, 0);
//
//            if($scope.selectedVariant.transcriptVariations.length != 0){
//                $scope.showTranscriptVarPanel = true;
//                $scope.selectedTranscriptVar = $scope.selectedVariant.transcriptVariations[0];
//            }
        }
        else{
            $scope.paginationData = [];
            $scope.snpDataSize=0;
        }

    };

    //save thee correct results and alert the incorrect
    $scope.checkSNPFilter2 = function(){
        var snpIdError = [];
        var snpFilters =  $scope.snpFilters.split(",");
        var error = false;
        var data = [];

        for(var i in $scope.paginationData){
            if($scope.paginationData[i] == undefined){
                snpIdError.push(snpFilters[i]);
                error = true
            }
            else{
                data.push($scope.paginationData[i]);
//                $scope.snpData[$scope.paginationData[i].id] = ($scope.paginationData[i]);
            }
        }
        if(error){
            var messageError = "";
            if(snpIdError.length != 0){
                messageError = snpIdError[0];
                for(var i=1;i<snpIdError.length;i++){
                    messageError = messageError + ", " + snpIdError[i];
                }
            }
            messageError = messageError + " incorrect";
            alert(messageError);

            $scope.paginationData = data;
        }

    };
    //save thee correct results and alert the incorrect
    $scope.checkSNPFilter = function(snpFilter){
        var snpIdError = [];
        var snpFilters =  $scope.snpFilters.split(",");
        var error = false;

        for(var i in snpFilter){
            if(snpFilter[i] == undefined){
                snpIdError.push(snpFilters[i]);
                error = true
            }
            else{
                $scope.snpData[snpFilter[i].id] = (snpFilter[i]);
            }
        }
        if(error){
            var messageError = "";
            if(snpIdError.length != 0){
                messageError = snpIdError[0];
                for(var i=1;i<snpIdError.length;i++){
                    messageError = messageError + ", " + snpIdError[i];
                }
            }
            messageError = messageError + " incorrect";
            alert(messageError);
        }
    };
    //===================== tree events ========================
    $scope.showVariant = function (variantId, index, fromGV){

        if($scope.toggleTree[index]){
            $scope.toggleTree[index] = false;
        }
        else{
            $scope.toggleTree[index] = true;
        }

        $scope.showSelectedVariant(variantId, fromGV);
        if($scope.selectedVariant.transcriptVariations.length != 0){
            $scope.showSelectedTranscriptVar(variantId,$scope.selectedVariant.transcriptVariations[0].transcriptId, fromGV);
        }

    };

    $scope.showTranscriptVar = function (variantId, transcriptId) {
        $scope.showSelectedVariant(variantId);
        $scope.showSelectedTranscriptVar(variantId, transcriptId);
    };




    //show variant panel
    $scope.showSelectedVariant = function (variantId, fromGV) {
        if ($scope.lastDataShow != variantId) {
            $scope.lastDataShow = variantId;
            $scope.showVariantPanel = true;
            $scope.selectedVariant = CellbaseService.getVariantsDataById($scope.selectedSpecie.shortName, variantId)[0];

            $scope.showTranscriptVarPanel = false;
        }
        else {
            if (!$scope.showVariantPanel) {
                $scope.showVariantPanel = true;
            }
        }
        $scope.selectedTranscriptVar = $scope.selectedVariant.transcriptVariations;



        if($('#variants_GV').hasClass("active")&& !fromGV){
//            mySharedService.broadcastVariantsRegionToGV($scope.selectedVariant.chromosome+":"+$scope.selectedVariant.start+"-"+$scope.selectedVariant.end);
            $rootScope.$broadcast("variationsGV:regionToGV", $scope.selectedVariant.chromosome + ":" + $scope.selectedVariant.start + "-" + $scope.selectedVariant.end,mySharedService.variantsSpecie.shortName);
//            $rootScope.$broadcast("variationsGV:regionToGV", $scope.selectedVariant.chromosome + ":" + $scope.selectedVariant.start + "-" + $scope.selectedVariant.end,mySharedService.genesSpecie.shortName);

        }
    };
    //show transcripts panel
    $scope.showSelectedTranscriptVar = function (variantId, transcriptId, fromGV) {
        var transcripts;

        if ($scope.lastDataShow != variantId) {
            $scope.lastDataShow = variantId;
            $scope.showVariantPanel = false;
            $scope.selectedVariant = CellbaseService.getVariantsDataById($scope.selectedSpecie.shortName, variantId)[0];
        }
        $scope.showTranscriptVarPanel = true;

        for (var i in  $scope.selectedVariant.transcriptVariations) {
            if ($scope.selectedVariant.transcriptVariations[i].transcriptId == transcriptId) {
                $scope.selectedTranscriptVar = $scope.selectedVariant.transcriptVariations[i];
            }
        }
        if($('#variants_GV').hasClass("active")&& !fromGV) {
//            mySharedService.broadcastVariantsRegionToGV($scope.selectedVariant.chromosome+":"+$scope.selectedVariant.start+"-"+$scope.selectedVariant.end);
            $rootScope.$broadcast("variationsGV:regionToGV", $scope.selectedVariant.chromosome + ":" + $scope.selectedVariant.start + "-" + $scope.selectedVariant.end,mySharedService.variantsSpecie.shortName);
//            $rootScope.$broadcast("variationsGV:regionToGV", $scope.selectedVariant.chromosome + ":" + $scope.selectedVariant.start + "-" + $scope.selectedVariant.end,mySharedService.genesSpecie.shortName);

        }
    };

    //show transcripts panel from transcripts table
    $scope.showTanscriptVarFromTable = function (transcriptVarId) {

        for (var i in $scope.selectedVariant.transcriptVariations) {
            if ($scope.selectedVariant.transcriptVariations[i].transcriptId == transcriptVarId) {
                $scope.selectedTranscriptVar = $scope.selectedVariant.transcriptVariations[i];
            }
        }
        $scope.transcriptVarInfo = false;
        $scope.showTranscriptVarPanel = true;
    };

    $scope.expandAllVariantsTree = function () {
        for(var i in $scope.toggleTree){
            $scope.toggleTree[i] = true;
        }
    };
    $scope.collapseAllVariantsTree = function () {
        for(var i in $scope.toggleTree){
            $scope.toggleTree[i] = false;
        }
    };

    $scope.obtainConsequenceTypes = function () {
        $scope.listOfConseqTypes = CellbaseService.getConsequenceTypes(mySharedService.variantsSpecie.shortName);
        mySharedService.broadcastVariantsConseqTypes($scope.listOfConseqTypes);
    };

    //tabs
    $scope.goToTab = function () {

        $(function () {
            $('#transcriptsVarTab a:first').tab('show')
        })
        $('#transcriptsVarTab a').click(function (e) {
            e.preventDefault()
            $(this).tab('show')
        })
    };

    $scope.changeResultTab = function () {
        $(function () {
            $('#variantsResultTab a:first').tab('show')
        })
        $('#variantsResultTab a').click(function (e) {
            e.preventDefault()
            $(this).tab('show')
        })
    };




    $scope.setResult(false);
    $scope.obtainConsequenceTypes();


    //  --------------download functions-------------------
    $scope.downloadVariantAsJSON = function () {
        var info = $scope.selectedVariant;
        delete info.transcriptVariations;
        $scope.downloadAsJSON(info, "SNP-"+info.id);
    };
    $scope.downloadTranscriptAsJSON = function () {
        var info = $scope.selectedTranscriptVar;
        delete info.consequenceTypes;
//        delete info.xrefs;
//        delete info.tfbs;
        $scope.downloadAsJSON(info, "SNP-"+$scope.selectedVariant.id+"transc-"+info.id);
    };

    $scope.downloadAsJSON=function(info, title){
        var str = JSON.stringify(info);
        var a = $('<a></a>')[0];

        $(a).attr('href','data:application/json,'+encodeURIComponent(str));
        $(a).attr('download',title+'json');
        a.click();
    };



    $scope.downloadVariantTabulated = function () {
        var info = $scope.selectedVariant;
        delete info.transcriptVariations;
        $scope.downloadTabulated(info, "SNP-"+info.id);
    };
    $scope.downloadTranscriptTabulated = function () {
        var info = $scope.selectedTranscriptVar;
        delete info.consequenceTypes;
//        delete info.xrefs;
//        delete info.tfbs;
        $scope.downloadTabulated(info, "SNP-"+$scope.selectedVariant.id+"transc-"+info.id);
    };




    $scope.convertToTabulate=function(info){
        var max_sep = 0;
        var j= 0;
        var max = Object.keys(info).length;
        var attrValueLength = 0;
        var str = "";

        for(var attr in info){
            if(j!=Object.keys(info).length-1){
                str = str + attr + "   ";
                if(isNaN(info[attr])){
                    attrValueLength = info[attr].length;
                }
                else{
                    attrValueLength = info[attr].toString().length;
                }
                if(attrValueLength > attr.length){
                    max_sep = attrValueLength - attr.length;
                    for(var i=0;i< max_sep;i++){
                        str = str + " ";
                    }
                }
            }else{
                str = str + attr;
            }

            j++;
        }
        str = str + "\n";

        for(var attr in info){
            str = str + info[attr] + "   ";

            if(isNaN(info[attr])){
                attrValueLength = info[attr].length;
            }
            else{
                attrValueLength = info[attr].toString().length;
            }
            if(attr.length > attrValueLength){
                max_sep = attr.length - attrValueLength;

                for(var i=0;i< max_sep;i++){
                    str = str + " ";
                }
            }
        }
        return str
    };
    $scope.downloadTabulated=function(info, title){
        var str = "";
        var a = $('<a></a>')[0];
        str = $scope.convertToTabulate(info);

        $(a).attr('href','data:text/plain,'+encodeURIComponent(str));
        $(a).attr('download',title+'json');
        a.click();
    };



    //--------------EVENTS-------------------

    $scope.$on('newSpecie', function () {
        $scope.obtainConsequenceTypes();


//        if(mySharedService.genesSpecie.shortName == "hsapiens" || mySharedService.genesSpecie.shortName == "mmusculus"){
        if(mySharedService.variantsSpecie.shortName == "hsapiens" || mySharedService.variantsSpecie.shortName == "mmusculus"){
            $('#variantsGV').removeClass("disabled");
        }
        else{
            $('#variantsGV').addClass("disabled");
        }
//        $scope.clearAll();
    });
//    $scope.$on('variantsNewSpecieGV', function () {
//        $scope.clearAll();
//    });
//    $scope.$on('variantsNewResult', function (event, fromGV) {
//        $scope.setResult(fromGV);
//    });

//    $scope.$on('variationsClear', function () {
//        $scope.clearAll();
//    });




}]);

variantsContr.$inject = ['$scope', 'mySharedService'];

