/** * @author xuld */

using("Controls.Suggest.ComboBox");

var CityChooser = Class({

    constructor: function (provinces, cities) {

        provinces = Dom.get(provinces);
        cities = Dom.get(cities);

        var value1 = provinces.getText();
        var value2 = cities.getText();

        provinces = this.provinces = new ComboBox(provinces).addClass('x-citychooser').setDropDownList(true);
        cities = this.cities = new ComboBox(cities).addClass('x-citychooser').setDropDownList(true);

        if (CityChooser.cdata == null) {
            CityChooser.cdata = {};
            for (var city in CityChooser.data) {
                var zz = city.split('@');
                CityChooser.cdata[zz[1]] = CityChooser.data[city];
                provinces.items.add(zz[0]).value = zz[1];
            }
        }

        provinces.on('change', function () {
            var value = this.getValue();
            cities.items.clear();
            cities.setText('请选择');
            cities.setValue(0);
            if (CityChooser.cdata[value])
                Object.each(CityChooser.cdata[value], function (value) {
                    var val = value.split('@');
                    cities.items.add(val[0]).value = val[1];
                });
        });

        if (!CityChooser.cdata[value1]) {
            provinces.setValue(0);
            provinces.setText('请选择');
        } else {
            provinces.setValue(value1);
        }

        if (value2 != '0') {
            cities.setValue(value2);
        }

        provinces.selectedItem = cities.selectedItem = null;
    }

});



CityChooser.data = {
    "北京市@1": ["东城区@1", "西城区@2", "崇文区@3", "宣武区@4", "朝阳区@5", "丰台区@6", "石景山区@7", "海淀区@8", "门头沟区@9", "房山区@10", "通州区@11", "顺义区@12", "延庆县@13", "昌平区@14", "怀柔区@15", "密云县@16", "平谷区@17", "大兴区@18", "其它地区@19"],
    "天津市@2": ["和平区@20", "河东区@21", "河西区@22", "南开区@23", "河北区@24", "红桥区@25", "塘沽区@26", "大港区@27", "东丽区@28", "西青区@29", "津南区@30", "北辰区@31", "蓟县@32", "宝坻区@33", "武清区@34", "宁河县@35", "静海县@36", "汉沽区@541", "其它地区@37"],
    "河北省@3": ["石家庄市@38", "张家口市@39", "承德市@40", "秦皇岛市@41", "唐山市@42", "廊坊市@43", "保定市@44", "沧州市@45", "衡水市@46", "邢台市@47", "邯郸市@48", "其它地区@49"],
    "山西省@4": ["太原市@50", "大同市@51", "朔州市@52", "阳泉市@53", "长治市@54", "晋城市@55", "忻州市@56", "吕梁市@57", "晋中市@58", "临汾市@59", "运城市@60", "其它地区@61"],
    "辽宁省@5": ["沈阳市@75", "朝阳市@76", "阜新市@77", "铁岭市@78", "抚顺市@79", "本溪市@80", "辽阳市@81", "鞍山市@82", "丹东市@83", "大连市@84", "营口市@85", "盘锦市@86", "锦州市@87", "葫芦岛市@88", "其它地区@89"],
    "吉林省@6": ["长春市@90", "白城市@91", "松原市@92", "吉林市@93", "四平市@94", "辽源市@95", "通化市@96", "白山市@97", "延边朝鲜族自治州@98", "其它地区@99"],
    "上海市@7": ["黄浦区@114", "卢湾区@116", "徐汇区@117", "长宁区@118", "静安区@119", "普陀区@120", "闸北区@121", "虹口区@122", "杨浦区@123", "闵行区@124", "宝山区@125", "嘉定区@126", "浦东新区@127", "金山区@128", "松江区@129", "崇明县@130", "青浦区@131", "南汇区@132", "奉贤区@133", "其它地区@134"],
    "江苏省@8": ["南京市@135", "徐州市@136", "连云港市@137", "宿迁市@138", "淮安市@139", "盐城市@140", "扬州市@141", "泰州市@142", "南通市@143", "镇江市@144", "常州市@145", "无锡市@146", "苏州市@147", "其它地区@148"],
    "浙江省@9": ["杭州市@149", "湖州市@150", "嘉兴市@151", "舟山市@152", "宁波市@153", "绍兴市@154", "金华市@155", "台州市@156", "温州市@157", "丽水市@158", "衢州市@538", "其它地区@159"],
    "安徽省@10": ["合肥市@160", "宿州市@161", "淮北市@162", "阜阳市@163", "蚌埠市@164", "淮南市@165", "滁州市@166", "马鞍山市@167", "芜湖市@168", "铜陵市@169", "安庆市@170", "黄山市@171", "六安市@172", "巢湖市@173", "池州市@174", "宣城市@175", "亳州市@540", "其它地区@176"],
    "福建省@11": ["福州市@177", "南平市@178", "三明市@179", "莆田市@180", "泉州市@181", "厦门市@182", "漳州市@183", "龙岩市@184", "宁德市@185", "其它地区@186"],
    "江西省@12": ["南昌市@187", "九江市@188", "景德镇市@189", "鹰潭市@190", "新余市@191", "萍乡市@192", "赣州市@193", "上饶市@194", "抚州市@195", "宜春市@196", "吉安市@197", "其它地区@198"],
    "山东省@13": ["济南市@199", "聊城市@200", "德州市@201", "东营市@202", "淄博市@203", "潍坊市@204", "烟台市@205", "威海市@206", "青岛市@207", "日照市@208", "临沂市@209", "枣庄市@210", "济宁市@211", "泰安市@212", "莱芜市@213", "滨州市@214", "菏泽市@215", "其它地区@216"],
    "河南省@14": ["郑州市@217", "三门峡市@218", "洛阳市@219", "焦作市@220", "新乡市@221", "鹤壁市@222", "安阳市@223", "濮阳市@224", "开封市@225", "商丘市@226", "许昌市@227", "漯河市@228", "平顶山市@229", "南阳市@230", "信阳市@231", "济源市@232", "周口市@233", "驻马店市@234", "其它地区@235"],
    "内蒙古@15": ["呼和浩特市@62", "包头市@63", "乌海市@64", "赤峰市@65", "呼伦贝尔@66", "兴安盟@67", "锡林郭勒盟@69", "乌兰察布市@70", "巴彦淖尔市@72", "阿拉善盟@73", "鄂尔多斯市@555", "通辽市@556", "其它地区@74"],
    "黑龙江省@16": ["哈尔滨市@100", "齐齐哈尔市@101", "黑河市@102", "大庆市@103", "伊春市@104", "鹤岗市@105", "佳木斯市@106", "双鸭山市@107", "七台河市@108", "鸡西市@109", "牡丹江市@110", "绥化地区@111", "大兴安岭地区@112", "其它地区@113"],
    "湖北省@17": ["武汉市@236", "十堰市@237", "襄樊市@238", "荆门市@239", "孝感市@240", "黄冈市@241", "鄂州市@242", "黄石市@243", "咸宁市@244", "荆州市@245", "宜昌市@246", "随州市@247", "仙桃市@248", "天门市@249", "潜江市@250", "神农架林区@251", "恩施土家族苗族自治州@252", "其它地区@253"],
    "湖南省@18": ["长沙市@254", "张家界市@255", "常德市@256", "益阳市@257", "岳阳市@258", "株洲市@259", "湘潭市@260", "衡阳市@261", "郴州市@262", "永州市@263", "邵阳市@264", "怀化市@265", "娄底市@266", "湘西土家族苗族自治州@267", "其它地区@268"],
    "广东省@19": ["广州市@269", "清远市@270", "韶关市@271", "河源市@272", "梅州市@273", "潮州市@274", "汕头市@275", "揭阳市@276", "汕尾市@277", "惠州市@278", "东莞市@279", "深圳市@280", "珠海市@281", "中山市@282", "江门市@283", "佛山市@284", "肇庆市@285", "云浮市@286", "阳江市@287", "茂名市@288", "湛江市@289", "其它地区@290"],
    "广西@20": ["南宁市@291", "桂林市@292", "柳州市@293", "梧州市@294", "贵港市@295", "玉林市@296", "钦州市@297", "北海市@298", "防城港市@299", "百色市@301", "河池市@302", "贺州市@304", "崇左市@542", "凭祥市@543", "来宾市@544", "其它地区@305"],
    "海南省@21": ["海口市@306", "三亚市@307", "琼山市@308", "文昌市@309", "琼海市@310", "万宁市@311", "东方市@313", "儋州市@314", "临高县@315", "澄迈县@316", "定安县@317", "屯昌县@318", "昌江黎族自治县@319", "白沙黎族自治县@320", "琼中黎族苗族自治县@321", "陵水黎族自治县@322", "保亭黎族苗族自治县@323", "乐东黎族自治县@324", "五指山市@539", "其它地区@326"],
    "四川省@22": ["成都市@359", "广元市@360", "绵阳市@361", "德阳市@362", "南充市@363", "广安市@364", "遂宁市@365", "内江市@366", "乐山市@367", "自贡市@368", "泸州市@369", "宜宾市@370", "攀枝花市@371", "巴中市@372", "达州市@373", "资阳市@374", "眉山市@375", "雅安市@376", "阿坝藏族羌族自治州@377", "甘孜藏族自治州@378", "凉山彝族自治州@379", "其它地区@380"],
    "重庆市@23": ["渝中区@327", "大渡口区@328", "江北区@329", "沙坪坝区@330", "九龙坡区@331", "南岸区@332", "北碚区@333", "万盛区@334", "双桥区@335", "渝北区@336", "巴南区@337", "万州区@338", "涪陵区@339", "合川市@340", "永川市@341", "江津市@342", "南川市@343", "长寿区@344", "綦江县@345", "潼南县@346", "铜梁县@347", "大足县@348", "荣昌县@349", "璧山县@350", "垫江县@351", "武隆县@352", "丰都县@353", "城口县@354", "梁平县@355", "黔江区@357", "奉节县@545", "开县@546", "云阳县@547", "忠县@548", "巫溪县@549", "巫山县@550", "石柱土家族自治县@551", "秀山土家族苗族自治县@552", "酉阳土家族苗族自治县@553", "彭水苗族土家族自治县@554", "其它地区@358"],
    "台湾省@24": ["台北市@479", "高雄市@480", "台南市@481", "台中市@482", "其它地区@484", "基隆市@579", "新竹市@580", "嘉义市@581", "台北县@582", "宜兰县@583", "新竹县@584", "桃园县@585", "苗栗县@586", "台中县@587", "彰化县@588", "南投县@589", "嘉义县@590", "云林县@591", "台南县@592", "高雄县@593", "屏东县@594", "台东县@595", "花莲县@596", "澎湖县@597", "钓鱼岛@602"],
    "贵州省@25": ["贵阳市@381", "六盘水市@382", "遵义市@383", "毕节地区@384", "铜仁地区@385", "安顺市@386", "黔东南苗族侗族自治州@387", "黔南布依族苗族自治州@388", "黔西南布依族苗族自治州@389", "其它地区@390"],
    "云南省@26": ["昆明市@391", "曲靖市@392", "玉溪市@393", "丽江市@394", "昭通市@395", "普洱市@396", "临沧市@397", "保山市@398", "德宏傣族景颇族自治州@399", "怒江傈傈族自治州@400", "迪庆藏族自治州@401", "大理白族自治州@402", "楚雄彝族自治州@403", "红河哈尼族彝族自治州@404", "文山壮族苗族自治州@405", "西双版纳傣族自治州@406", "其它地区@407"],
    "西藏@27": ["拉萨市@408", "那曲地区@409", "昌都地区@410", "林芝地区@411", "山南地区@412", "日喀则地区@413", "阿里地区@414", "其它地区@415"],
    "陕西省@28": ["西安市@416", "延安市@417", "铜川市@418", "渭南市@419", "咸阳市@420", "宝鸡市@421", "汉中市@422", "榆林市@423", "商洛市@424", "安康市@425", "其它地区@426"],
    "甘肃省@29": ["兰州市@427", "嘉峪关市@428", "金昌市@429", "白银市@430", "天水市@431", "酒泉市@432", "张掖市@433", "武威市@434", "庆阳市@435", "平凉市@436", "定西市@437", "陇南地区@438", "临夏回族自治州@439", "甘南藏族自治州@440", "玉门市@557", "敦煌市@558", "其它地区@441"],
    "青海省@30": ["西宁市@442", "海东地区@443", "海北藏族自治州@444", "海南藏族自治州@445", "黄南藏族自治州@446", "果洛藏族自治州@447", "玉树藏族自治州@448", "海西蒙古族藏族自治州@449", "青海省其它地区@450"],
    "宁夏@31": ["银川市@451", "石嘴山市@452", "吴忠市@453", "固原市@454", "中卫市@599", "其它地区@455"],
    "新疆@32": ["乌鲁木齐市@456", "克拉玛依市@457", "石河子市@458", "喀什地区@459", "阿克苏地区@460", "和田地区@461", "吐鲁番地区@462", "哈密地区@463", "克孜勒苏柯尔克孜自治州@464", "博尔塔拉蒙古自治州@465", "昌吉回族自治州@466", "巴音郭楞蒙古自治州@467", "伊犁哈萨克自治州@468", "阿拉尔市@469", "塔城地区@470", "阿勒泰地区@471", "图木舒克市@600", "五家渠市@601", "其它地区@472"],
    "香港@33": ["九龙城区@474", "中西区@559", "东区@560", "观塘区@561", "南区@562", "深水埗区@563", "黄大仙区@564", "湾仔区@565", "油尖旺区@566", "离岛区@567", "葵青区@568", "北区@569", "西贡区@570", "沙田区@571", "屯门区@572", "大埔区@573", "荃湾区@574", "元朗区@575", "其它地区@476"],
    "澳门@34": ["花地玛堂区@603", "圣安多尼堂区@604", "大堂区@605", "望德堂区@606", "风顺堂区@607", "嘉模堂区@608", "圣方济各堂区@609"]
};


