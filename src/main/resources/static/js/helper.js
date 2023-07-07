class ajaxHelper {
    constructor(element, settings, args) {
        this.$element = $(element);
        this.args = args ? args : {};
        this.settings = {
            method: 'GET',
            dataType: 'JSON',
            url: '/',
            parent: 'main-section',
            preloader: true,
            removeChildren: true,
            onSuccess: false,
            onFail: false
        };
        $.extend(this.getSettings(), settings);
    }
    getArgs(){
        return this.args;
    }
    getSettings(){
        return this.settings;
    }
    getElement(){
        return this.$element;
    }
    setConfigData(key, value){
        
    }
    getSetting(key){
        return this.settings[key];
    }
    getMethod(){
        return this.settings['method'];
    }
    getDataType(){
        return this.settings['dataType'];
    }
    getUrl(){
        return this.settings['url'];
    }
    getParent(){
        return this.settings['parent'];
    }
    isSpinner(){
        return this.settings['preloader'];
    }
    isRemoveChildren(){
        return this.settings['removeChildren'];
    }
    getSuccessCallback(){
        return this.settings['successCallback'];
    }
    getFailCallback(){
        return this.settings['failCallback'];
    }    
    getAttributeElement(attribute){
        return this.$element.attr(attribute);
    }
    openSpinner(){
        spinner.show();
    }
    closeSpinner(){
        spinner.hide();
    }
    fetch(){
        const that = this;  
        if(that.isSpinner()){
            this.openSpinner();
        }
        if(this.$element.is("form")){
            this.ajax = $.ajax({
                type: that.getMethod(),
                data: new FormData(that.getElement()[0]),
                dataType: that.getDataType(),
                url: that.getUrl(),
                processData: false,
                contentType: false
            });
        }else{
            this.ajax = $.ajax({
                type: that.getMethod(),
                data: that.getArgs(),
                dataType: that.getDataType(),
                url: that.getUrl()
            });
        }
        this.ajax.done(function(response) {
            if(that.isSpinner()){
                that.closeSpinner();
            }
            if(that.getDataType() == 'HTML'){
                
                if (typeof that.getParent() === "element") {
                    if(that.isRemoveChildren()){
                        $(that.getParent()).children().remove();
                    }
                    $(that.getParent()).append(response);
                } else {
                    if(that.isRemoveChildren()){
                        $("#"+that.getParent()).children().remove();
                    }
                    $("#"+that.getParent()).append(response);
                }   
                if(that.getSuccessCallback()){
                    that.getSuccessCallback()();
                }
            } else if(that.getDataType() == 'JSON'){
                if(response.callback){
                    if (typeof response.callback.args == "undefined") {
                        eval(response.callback.name)();
                    } else {
                        eval(response.callback.name)(response.callback.args);
                    }
                }    
                if(response.errors){
                    $("div[error-field]", that.$object).html('');
                    //$("input[name]", that.$object).removeClass("invalid");
                    $.each(response.errors, function(index, error){
                        //$("input[name='" + error.field + "']", that.$object).addClass("invalid");
                        $("div[error-field='" + error.field + "']", that.$object).append(error.error[0] + '<br>');
                    });
                }                      
                if(that.getSuccessCallback()){
                    that.getSuccessCallback()();
                }
            } else {
                alert("Data Type undefined...");
            }
        });
        this.ajax.fail(function (jqXHR, textStatus, errorThrown) {
            if(that.getFailCallback()){
                that.getFailCallback()();
            }
            if(that.isSpinner()){
                that.closeSpinner();
            }
            alert("Fail...");
        });
        return false;
    }
}
//export default ajaxHelper;


function ajaxHelperCommon(element, url, method, dataType, parent, args, removeChildren){    
	let settings = {
		dataType: dataType,
		url:url,
		method: method		
	};
	if (parent) {
		settings.parent = parent;
	}
    if (typeof removeChildren !== 'undefined') {
        settings.removeChildren = removeChildren;
    }
	
	return new ajaxHelper(
		element, 
		settings, 
		args
	)
	.fetch();
}
export function postHtml(element, url, parent, args){
	return ajaxHelperCommon(element, url, 'POST', 'HTML', parent, args);
}
export function getHtml(element, url, parent, args, removeChildren){
	return ajaxHelperCommon(element, url, 'GET', 'HTML', parent, args, removeChildren);
}
export function postJson(element, url, args){
	return ajaxHelperCommon(element, url, 'POST', 'JSON', null, args);
}
export function getJson(element, url, args){
	return ajaxHelperCommon(element, url, 'GET', 'JSON', null, args);
}
export const Log = {
    info : function(message){
        console.log(message);
        return false;
    }
};
export var math = require('mathjs');
export var table = {
    removeTr: function (element) {
        let tr = $(element).closest('tr');
        /*tr.slideUp("normal", function() {
            $(this).remove();
        });*/
        tr.remove();
    }
}
export var items = {
    removeItem: function (element) {
        //$(element).closest('tr').remove();
        $(element).closest('.invoice-item').slideUp("normal", function() {
            $(this).remove(); 
            items.calcTotales();
        });           
    },
    precision: function(number, decimal) {
        return math.format(number, {notation: 'fixed', precision: (decimal ? decimal : 2)});
    },
    decimal: function(number){
        return parseInt(number, 10);
    },
    calcTotalItem: function (id, price) {
        price = parseFloat(price);
        let discount = parseFloat($('#discountItem-' + id).val());
        let quantityValue = parseFloat($('#quantityItem-' + id).val());
        let ice = $('#iceItem-' + id).html();
        let total = math.multiply(price , quantityValue);
        total = parseFloat(total) + parseFloat(ice) - ( total * parseFloat(discount) / 100);
        $("#totalItem-" + id).val(items.precision(total));
        items.calcTotales();
    },
    existItem: function (id) {
        var result = false;
        $("input[name='itemId[]']").each(function () {
            if (id == $(this).val()) {
                result = true;
            }
        });
        return result;
    },
    addQuantity: function (id, price) {
        var quantity = $("#quantityItem-" + id).val() ? items.decimal($("#quantityItem-" + id).val()) : 0;
        $("#quantityItem-" + id).val(++quantity);
        this.calcTotalItem(id, price);
    },
    deleteLine: function (id) {
        $("#row_" + id).remove();
        items.calcTotales();
    },
    calcTotales: function () {
        var totalValue = 0;
        var subtotalesImp = [];
        var subtotalWithoutTaxes = 0;
        var iva = 0;
        var discount = 0;
        items.clearTotales();
        $("input[id^='totalItem-']").each(function () {    
            var value = $(this).val();        
            var id = $(this).attr('id').replace('totalItem-','')
            var totalItem = parseFloat(value);
            var quantityItem = parseFloat($('#quantityItem-'+id).val());
            var priceItem = parseFloat($('#priceItem-'+id).val());
            var percent = $(this).data('percentage');
            var subtotalId = $(this).data('target');
            discount += quantityItem * priceItem * parseFloat($('#discountItem-'+id).val()) / 100;
            if( typeof subtotalesImp[subtotalId] === 'undefined') {
                subtotalesImp[subtotalId] = 0;
            }
            subtotalesImp[subtotalId] += totalItem;
            $('#'+subtotalId).html(items.precision(subtotalesImp[subtotalId], 2));
            if( percent > 0 ) {
                iva += totalItem * percent / 100;
                $('#invoiceSumIva').html(items.precision(iva, 2));
            } else {
                subtotalWithoutTaxes += subtotalesImp[subtotalId];
            }
            totalValue = totalValue + parseFloat(value);            
        });
        $("#invoiceSumSubtotalNoTax").html(items.precision(totalValue, 2));
        $("#invoiceSumTotalDiscount").html(items.precision(discount, 2));
        $("#invoiceSumTotal").html(items.precision(totalValue + iva, 2));
    },
    clearTotales: function () {
        $("span[id^='invoiceSum']").each(function () {
            $(this).html('0.00');
        });
    }
}
export function unEscape(htmlStr) {
    htmlStr = htmlStr.replace(/&lt;/g , "<");	 
    htmlStr = htmlStr.replace(/&gt;/g , ">");     
    htmlStr = htmlStr.replace(/&quot;/g , "\"");  
    htmlStr = htmlStr.replace(/&#39;/g , "\'");   
    htmlStr = htmlStr.replace(/&amp;/g , "&");
    return htmlStr;
}
export function paginator(knpPaginationRender, paginatorParent, itemsParent, from, to) {
    $('#' + paginatorParent).children().remove();
    $('#' + paginatorParent).append(unEscape(knpPaginationRender));
    if (typeof from !== 'undefined') {
        $('#' + paginatorParent).parent().parent().find('span[data-paginator=from]').html(from);
    }
    if (typeof to !== 'undefined') {
        $('#' + paginatorParent).parent().parent().find('span[data-paginator=to]').html(to);
    }
    let paginatorContainer = document.querySelector('#' + paginatorParent);
    let page = paginatorContainer.querySelectorAll('.pagination li a');
    page.forEach(function(a) {
        let attribute = 'data-url';
        let ajaxActive = '&aj=true';
        let href = a.getAttribute('href');
        a.setAttribute(attribute, href.replace(ajaxActive, ''));
        a.setAttribute('href', 'javascript:void(0);');        
        
        a.onclick = function(e) {
            e.preventDefault();
            spinner.show();
            //history.pushState(null, '', this.getAttribute(attribute));
            fetch(this.getAttribute(attribute)+ajaxActive)
            .then(function (response) {
                return response.text();
            }).then(function (html) {
                $('#' + itemsParent).children().remove();
                $('#' + itemsParent).append(html);
                spinner.hide();
            });                    

        };

    });
}   
export var spinner = {
    show: function() {
        $('#spinner').fadeIn(200);
    },
    hide: function() {
        $('#spinner').delay(200).fadeOut(200);
    }
}
export function toast(toastOptions) {  
    let defaultOptions   = {
        delay: 5000,
        text: 'Info',
        type: 'primary',
        header: ''
    };
    toastOptions = $.extend(defaultOptions, toastOptions);
    let bgClass = 'bg-primary';
    switch (toastOptions.type) {
        case 'primary':
            bgClass = 'bg-primary';
            break;
        case 'success':
            bgClass = 'bg-success';
            break;
        case 'danger':
            bgClass = 'bg-danger';
            break;
        case 'secondary':
            bgClass = 'bg-secondary';
            break;
        case 'info':
            bgClass = 'bg-info';
            break;
        case 'warning':
            bgClass = 'bg-warning';
            break;
        case 'dark':
            bgClass = 'bg-dark';
            break;
    }
    let $body = $('body');
    let $toastContainer = $('#toast-container').length == 0 ? $('<div>').attr({'id':'toast-container'}).addClass('toast-container').appendTo($body) : $('#toast-container'); //d-flex justify-content-end top-10 fixed-top   
    let $toast = $('<div>').addClass('toast align-items-center text-white border-0 top-0 end-0')
        .addClass(bgClass)
        .appendTo($toastContainer);
    if (typeof toastOptions.class !== 'undefined') {
        $toast.addClass(toastOptions.class);
    }
    let $toastHeader;
    let $toastFlex = $('<div>').addClass(toastOptions.header ? toastOptions.header : 'd-flex').appendTo($toast);    
    if (toastOptions.header) {
        $toastHeader = $('<div>').addClass('toast-header').html(toastOptions.header).appendTo($toastFlex);
    }
    $('<div>').addClass('toast-body').html(toastOptions.text).appendTo($toastFlex);
    let $close = $('<button>').addClass('btn-close me-2 m-auto')
        .addClass(toastOptions.header ? 'btn-close-dark' : 'btn-close-white')
        .attr({
            'data-bs-dismiss': 'toast',
            'aria-label':'Close'
        });    
    toastOptions.header ? $close.appendTo($toastHeader) : $close.appendTo($toastFlex);
    var toast = new bootstrap.Toast($toast.get(0), toastOptions);
    toast.show();
}