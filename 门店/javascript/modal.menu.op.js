/**
 * Created by chaoyue on 2017/12/4.
 */


(function($){

    //        添加新分类模块
    $('.category-box').on('click','#cre_menu_category',function(e){
        var c_ul = $(this).parent().find('.category-op-list')
            ,tpl_category = '<li class="category-op-item active">'
            +'<span class="category-name">请命名<input class="cg-ipt input-sm" name="category-name" value="" /></span>'
            +'<ul class="ops-ico-list">'
            +'<li class="ops-ico op-ico-up"></li>'
            +'<li class="ops-ico op-ico-down"></li>'
            +'<li class="ops-ico op-ico-del"></li>'
            +'<li class="ops-ico op-ico-remarks"></li></ul></li>'

        c_ul.children().removeClass('active');
        c_ul.append(tpl_category)
    })


//        分类操作如下
    var category_op = $('.category-op-list')
    var _e = window.event
        ,wrap = document.querySelector('.category-name');
    var b_name = navigator.appName;
    var b_version = navigator.appVersion;
    var version = b_version.split(";");
    var trim_version = version[1].replace(/[ ]/g, "");

    category_op.on('click.menu','.ops-ico',function(e){
        var _this = $(this),
            _li = _this.parent().parent();

        if(!_li.hasClass("active")){
            _li.addClass('active').siblings().removeClass('active')
        }

        if(_this.hasClass('op-ico-up')){
            if (_li.index() != 0) {
                _li.fadeOut().fadeIn();
                _li.prev().before(_li);
            }
        }
        // 分类模块下移操作
        if(_this.hasClass('op-ico-down')){
            var c_len = $('.category-op-list').children().length;
            if (_li.index() !== c_len-1) {
                _li.fadeOut().fadeIn();
                _li.next().after(_li);
            }
        }
        //删除当前分类
        if(_this.hasClass('op-ico-del')){
            _li.remove();
        }

        //定义分类
        if(_this.hasClass('op-ico-remarks')){
            var $ul = _this.parent()
                ,category_span = $ul.prev()
                ,category_ipt = category_span.find('input')
                ,val = category_ipt.val()
                ,$children = category_span.children();

            $ul.hide();
            category_span.empty().append($children);
            category_ipt.show().val('').focus().removeAttr("readonly").val(val)
        }
    })

    //失去焦点事件
    category_op.on('blur','.category-name input',function(e){
        var _this = $(this)
            ,text = _this.val()
            ,category_span = _this.parent()
            ,$parents_li = _this.closest('li')
            ,$ul = $parents_li.find('.ops-ico-list')

        _this.attr("readonly","readonly").hide()
        category_span.prepend(text)
        $ul.show()
    })


//        针对表格某一行菜品的操作
    var menu_tb = $('.menu-mana-tb')
    menu_tb.on('click','.btn-op',function(e){
        e.stopPropagation();
        e.preventDefault();

        var $this = $(this),
            $tr = $this.parents("tr");
        //上移
        if( $this.hasClass('op-up')){

            if ($tr.index() != 0) {
                $tr.fadeOut().fadeIn();
                $tr.prev().before($tr);
            }
        }else if($this.hasClass('op-down')){
//                下移
            var len = $('.down').length;

            if ($tr.index() != len - 1) {
                $tr.fadeOut().fadeIn();
                $tr.next().after($tr);
            }
        }else if($this.hasClass('op-copy')){

            //复制菜品
            var first_td = menu_tb.find('tbody tr:eq(0)'),
                container = $('.menu-main-wrapper .scrollable')

            container.animate({scrollTop: 0},500);
//                menu_tb.prepend($tr.clone().fadeOut().fadeIn());
            $tr.clone().insertBefore(first_td).fadeOut().fadeIn();

        }else if( $this.hasClass('op-delete')){
            //删除当前单元格
            $tr.remove();
        }
    });

    //一键同步是否选中
    $(".choice-platform").on('click',".choice-item",function(e){
        e.preventDefault();
        e.stopPropagation?e.stopPropagation():e.cancelBubble=true;

        var $this =$(this)
            ,ipt_children = $this.children('input')
            ,flag = ipt_children[0] && ipt_children[0].checked || false;

        ipt_children[0].checked = !flag;
    });

    var $menu_form = $('#create_menu');
    // 添加菜品规格
    $menu_form.on('click','.add-menu-spec',function(e){
        var $this = $(this),$dish_ul
            ,$dl = $this.parent().prev()
            ,tpl_ul='<dd><ul class="dish-spec-item-list">'
            +'<li><label class="control-label"><span class="warn-required">*</span>价格：</label>'
            +'<div class="ipt-cell-control"><input type="number" min="0" name="dish-price" class="cell-ipt" />元</div></li>'
            +'<li><label class="control-label"><span class="warn-required">*</span>餐盒费：</label>'
            +'<div class="ipt-cell-control"><input type="number" min="0" name="lunch-box-fee" class="cell-ipt" />元</div></li></ul></dd>'

            ,multi_tpl_ul = ' <dd><ul class="dish-spec-item-list">'
            +'<li><label class="control-label"><span class="warn-required">*</span>规格名：</label>'
            +'<input type="text" name="spec-name" class="cell-ipt form-ipt input-sm" placeholder="比如：大、中、小" /></li>'
            +'<li><label class="control-label"><span class="warn-required">*</span>价格：</label>'
            +'<div class="ipt-cell-control"><input type="number" min="0" name="dish-price" class="cell-ipt" />元</div></li>'
            +'<li><label class="control-label"><span class="warn-required">*</span>餐盒费：</label>'
            +'<div class="ipt-cell-control"><input type="number" min="0" name="lunch-box-fee" class="cell-ipt" />元</div>'
            +'</li><li class="spec-item-del"><i class="menu-ico-del"></i></li></ul></dd>';

        if($dl.children().length >= 6)
            return;

        if($dl.children().length == 1){
            var dd_f = $dl.children().eq(0)
                ,ul_len = dd_f.children().children().length;
            if(ul_len == 2)
                $dl.children().remove();

            $dl.append(multi_tpl_ul)
        }else if($dl.children().length > 1){
            $dl.append(multi_tpl_ul)
        }

    })
    // 删除菜品规格
    $menu_form.on('click','.spec-item-del',function(e){
        var $this = $(this)
            ,$parent_dd = $this.closest('dd')
            ,$parent_dl = $parent_dd.closest('.dish-specification-group')
            ,dl_len = $parent_dl.children().length
            ,tpl_ul='<dd><ul class="dish-spec-item-list">'
            +'<li><label class="control-label"><span class="warn-required">*</span>价格：</label>'
            +'<div class="ipt-cell-control"><input type="number" min="0" name="dish-price" class="cell-ipt" />元</div></li>'
            +'<li><label class="control-label"><span class="warn-required">*</span>餐盒费：</label>'
            +'<div class="ipt-cell-control"><input type="number" min="0" name="lunch-box-fee" class="cell-ipt" />元</div></li></ul></dd>'

        if(dl_len == 1){
            $parent_dd.remove();
            $parent_dl.append(tpl_ul)
        }else
            $parent_dd.remove()
    })

    // 添加菜品属性细分
    $menu_form.on('click','.add-menu-attr',function(e){
        var $this = $(this)
            ,$dl = $this.parent().prev()
            ,tpl_attr_ul='<dd><ul class="menu-attr-list">'
            +'<li class="attr-name"><label class="wd-md control-label">属性名称：</label>'
            +'<div class="pull-left wd-sm">'
            +'<div class="btn-group sel-add-group m-r select-base">'
            +'<button data-toggle="dropdown" class="select-btn  dropdown-toggle">'
            +'<span class="dropdown-label">请选择</span>'
            +'<span class="sel-arrow"><b></b></span></button>'
            +'<ul class="dropdown-menu dropdown-select">'
            +'<li class="sel-add-item">'
            +'<input type="text" class="txt-placeholder" name="add-item" placeholder="请输入菜品属性"><span class="add-btn">添加</span></li>'
            +'<li><a href="#"><input type="radio" name="d-s-r">甜度</a></li>'
            +'<li><a href="#"><input type="radio" name="d-s-r">辣度</a></li></ul></div></div></li>'
            +' <li class="attr-subdivision">'
            +'<label class="control-label">属性细分<span class="cell-tip">（至少填写两个）</span>：</label>'
            +' <input type="text" name="sub-attr" class="sub-a-cell input-sm" /><input type="text" name="sub-attr" class="sub-a-cell input-sm" /><input type="text" name="sub-attr" class="sub-a-cell input-sm" /> <input type="text" name="sub-attr" class="sub-a-cell input-sm" /><input type="text" name="sub-attr" class="sub-a-cell input-sm" /></li>'
            +'<li class="attr-item-del"><i class="menu-ico-del"></i></li></ul></dd>';

        if($dl.children().length >= 5)
            return;

        $dl.append(tpl_attr_ul)
    })
    // 删除菜品属性
    $menu_form.on('click','.attr-item-del',function(e){
        var $this = $(this)
            ,$parent_dd = $this.closest('dd')
            ,$parent_dl = $parent_dd.closest('.menu-attr-group')
            ,dl_len = $parent_dl.children().length
            ,tpl_ul='<dd><ul class="dish-spec-item-list">'
            +'<li><label class="control-label"><span class="warn-required">*</span>价格：</label>'
            +'<div class="ipt-cell-control"><input type="number" min="0" name="dish-price" class="cell-ipt" />元</div></li>'
            +'<li><label class="control-label"><span class="warn-required">*</span>餐盒费：</label>'
            +'<div class="ipt-cell-control"><input type="number" min="0" name="lunch-box-fee" class="cell-ipt" />元</div></li></ul></dd>'

        if(dl_len == 1) return;
        $parent_dd.remove();
    })


//        员工管理状态切换
    var staff_tb = $('.staff-mana-tb')
    staff_tb.on('click','.status-st-toggle',function(e){
        var _this = $(this)
        _this.toggleClass('active')
    });
    //员工管理单选按钮
    var staff_info_form = $('.staff-info-form')
    staff_info_form.on('click',".choice-item",function(e){
        e.preventDefault();
        e.stopPropagation?e.stopPropagation():e.cancelBubble=true;

        var $this =$(this),
            ipt_children = $this.children('input');
        var flag = ipt_children[0] && ipt_children[0].checked || false;

        if($this.hasClass('type-chk')){
            ipt_children[0].checked = !flag;
        }else {
            if (!flag)
                ipt_children[0].checked = !flag;
        }
    });

})(jQuery);