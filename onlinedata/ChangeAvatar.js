const btn_select_color = "#ff00ff";

var gender = "女";

// uc:uppercos
// lc:lowercos
// sh:shoes
// ha:hairacss
// ba:bodyacss
// hair:hair
// ff:facefeature
// eb:eyebrow

// 役職のパーツにした場合にその前のパーツ番号を覚えておく
var before_role_han = 0;
// haの役職のパーツ番号
const roles=[6,7,9,10,11,12,13,16,115,138];
// haの特殊なパーツ番号
const special=[63,65,117,118,229,230,247,248,250];
// svgファイルから読み込むパーツ(これ以外はインラインにしてある)
const PartsFile = ["uc","lc","sh","ha","ba","hair","eye"];

const PartsNo = {
  uc:2,
  lc:7,
  sh:13,
  ha:37,
  ba:39,
  hair:4,
  face:4,
  ff:3,
  eb:5,
  eye:18,
  mouth:10
}

const PartsCol = {
  uc:17,
  lc:1,
  sh:27,
  ha:1,
  ba:9,
  hair:39,
  eye:38,
  skin:41
}

const SvgId = {
  uc:["UpperCos",["UpperCos","Sleeve","Bracelet"]],
  lc:["LowerCos",["LowerCos"]],
  sh:["Shoe",[["Shoe_L","Shoe"],["Shoe_R","Shoe"]]],
  ha:["HairAcss",["HairAcss"]],
  ba:["BodyAcss",["BodyAcss_Back","BodyAcss_Front"]],
  hair:["Hair",["BackHair","Hair"]],
  face:["Face",["Face"]],
  ff:["FaceChar",["FaceFeature"]],
  eb:["EyeBrow",["EyeBrow"]],
  eye:["Eye",["EyeLa","EyeLb","EyeLc","EyeRa","EyeRb","EyeRc"]],
  mouth:["Mouth",["Mouth"]]
}

const color_table ={
  1:["#aa1e1f","#5f0606","#ffffff"],
  2:["#985252","#b54235","#ffffff"],
  3:["#cb4d4e","#ccc","#000000"],
  4:["#c94200","#000000","#ffffff"],
  5:["#e57508","#b14015","#000000"],
  6:["#fecc41","#db9100","#000000"],
  7:["#ffebb2","#ccbc8e","#000000"],
  8:["#c4de56","#4eb418","#000000"],
  9:["#65933b","#2e5806","#000000"],
  10:["#325903","#639f25","#ffffff"],
  11:["#1d6864","#55c68b","#ffffff"],
  12:["#ccc","#ccc","#000000"],
  13:["#75dbb1","#24abb3","#000000"],
  14:["#33cccc","#339191","#000000"],
  15:["#e5f5f5","#8cdfff","#000000"],
  16:["#2ca6e9","#1b8bc9","#000000"],
  17:["#0f5383","#003d5f","#ffffff"],
  18:["#346495","#5498bc","#ffffff"],
  19:["#006699","#001f5d","#ffffff"],
  20:["#346495","#1a2064","#ffffff"],
  21:["#1c2c4f","#010612","#ffffff"],
  22:["#553174","#b89bdb","#ffffff"],
  23:["#a1388a","#74001f","#ffffff"],
  24:["#793c67","#c16f93","#ffffff"],
  25:["#71548a","#4c2a69","#ffffff"],
  26:["#f244c7","#b93378","#000000"],
  27:["#ff7f7e","#e93937","#000000"],
  28:["#ff8ec4","#e8688b","#000000"],
  29:["#d4bbbb","#ad8383","#000000"],
  30:["#623a3a","#000000","#ffffff"],
  31:["#996600","#774f00","#ffffff"],
  32:["#513624","#381606","#ffffff"],
  33:["#513624","#381f0e","#ffffff"],
  34:["#cccccc","#8f8f8f","#000000"],
  35:["#8c96a2","#858585","#000000"],
  36:["#999999","#7300fb","#000000"],
  37:["#666666","#313131","#ffffff"],
  38:["#666666","#000000","#ffffff"],
  39:["#333333","#000000","#ffffff"],
  40:["#ffe5c4","#f2cda5","#000000"],
  41:["#fff0dd","#ffd2a1","#000000"],
  42:["#ffd29b","#ffb564","#000000"],
  43:["#e0af7f","#c69157","#000000"],
  44:["#d79e69","#bd7842","#000000"],
  45:["#996b53","#7e4029","#ffffff"],
  46:["#fbe4ae","#fac17c","#000000"],
  47:["#fac3a6","#e27d6a","#000000"],
  48:["#e0aa90","#7b115c","#000000"],
  49:["#c0c093","#98984f","#000000"]
}

const PartsTbl ={
  uc:{
    // 0:[[""],[]], // 服なしの選択肢を追加する場合コメントアウト外す
    1:[[""],[1,5,6,9,16,25,27,39], [-0.0, 3.2, 0.05, 2.65, 0.35, 2.9], [1, 2, 3]],
    2:[[""],[17,23], [-4.05, 0.6, -0.45, 2.5, 0.15, 2.65], [1, 2, 3]],
    3:[[""],[16], [-0.75, 1.3, -0.2, 1.95, -1.3, 1.55], [1, 2, 3]],
    4:[[""],[1,34,39,49], [-1.2, 0.6, -1.1, 0.65, -0.5, 2.45], [1, 2, 3]],
    5:[[""],[15], [-1.9, 3.35, -0.35, 2.6, -0.4, 1.55], [1, 2, 3]],
    7:[[""],[1,5,6,9,13,15,19,25,27,34,39], [-0.15, 3.45, -1.0, 2.3, -0.2, 1.65], [1, 2, 3]],
    8:[[""],[1,5,6,9,13,15,19,25,27,31,34,39], [-1.3, 2.9, -0.9, 2.1], [1, 2]],
    9:[[""],[13,20,27], [-0.1, 2.05, 0.4, 2.4, 2.15, 10.8], [1, 2, 3]],
    10:[[""],[1,6,9,13,19,25,27,39], [-7.15, 2.3, 0.0, 0.0, 0.8, 4.95], [1, 3]],
    11:[[""],[6,9,19,25,26,27,39], [-2.7, 3.55, 0.0, 0.0, 1.75, 4.7], [1, 3]],
    12:[[""],[1,6,9,19,25,27,31,38], [-1.3, 2.2, -0.85, 2.1, 0.8, 8.7], [1, 2, 3]],
    13:[[""],[2,5,11,13,16,20,25,28,30,34,37,49], [-0.65, 1.0, -0.9, 2.1], [1, 2]],
    14:[[""],[6,13,19,24,27,39,49], [-1.35, 2.65, -0.1, 2.15, 0.2, 2.5], [1, 2, 3]],
    15:[[""],[1,17,31], [-0.9, 2.5, -0.3, 2.45, -0.2, 2.45], [1, 2, 3]],
    17:[[""],[11], [-1.35, 0.3, -0.3, 1.8, -0.2, 2.4], [1, 2, 3]],
    20:[[""],[1,14,29,39], [0.05, 3.05, 0.65, 1.75, -0.7, 6.25], [1, 2, 3]],
    21:[[""],[1,7,9], [-1.6, 3.05, 1.1, 1.85, -0.75, 1.85], [1, 2, 3]],
    23:[[""],[1,5,6,9,13,15,19,25,28,31,34,39], [-1.05, 1.8, -1.05, 2.4, -0.95, -0.2], [1, 2, 3]],
    24:[[""],[1,5,6,9,17,27,31,39], [-0.85, 3.0, -1.05, 2.8, -0.95, -0.2], [1, 2, 3]],
    26:[[""],[9], [-1.9, 0.5, -1.2, 2.05, -1.6, -1.7], [1, 2, 3]],
    28:[[""],[25], [-2.4, 0.45, 0.0, 0.0, 0.35, 4.1], [1, 3]],
    29:[[""],[1,13,16,25], [-1.3, 2.05, -0.2, 2.0], [1, 2]],
    34:[[""],[23], [-7.85, -2.35, -0.25, 2.15, -0.75, 1.75], [1, 2, 3]],
    36:[[""],[25,27,31,34], [-12.7, -3.55, -0.1, 2.15], [1, 2]],
    37:[[""],[1,9,34,39], [-1.1, -0.0, -1.1, 1.35, -0.25, 2.1], [1, 2, 3]],
    39:[[""],[32], [-7.7, -0.1, 0.15, 2.5, -0.0, 2.45], [1, 2, 3]],
    41:[[""],[10,17,27,34], [-0.9, 1.35, -0.6, 2.25, -0.8, 3.65], [1, 2, 3]],
    42:[[""],[42], [-4.5, 0.65, -0.4, 2.5, -0.8, 0.35], [1, 2, 3]],
    43:[[""],[1,6,19,39], [-0.45, 2.85, -0.45, 2.3], [1, 2]],
    44:[[""],[21,29], [-1.35, 2.0, -0.0, 1.95, -0.0, 2.95], [1, 2, 3]],
    46:[[""],[1,5,9,19,21,25,27,31], [-0.0, 1.75, -0.0, 2.65, -0.0, 2.9], [1, 2, 3]],
    49:[[""],[7,15,29,39], [-1.05, 2.55, -0.05, 2.4, -0.15, 1.9], [1, 2, 3]],
    52:[[""],[5], [-0.05, 1.0, 2.7, 5.9, -5.4, -2.2], [1, 2, 3]],
    55:[[""],[36], [-1.95, 3.0, -0.3, 2.45, -0.0, 3.05], [1, 2, 3]],
    71:[[""],[26], [-1.35, 3.0, -0.55, 2.25, -0.6, 2.0], [1, 2, 3]],
    73:[[""],[1], [-5.8, 1.65, 0.05, 1.75, 0.25, 2.75], [1, 2, 3]],
    74:[[""],[15], [-0.05, 1.65, -0.25, 2.1, -0.55, 3.25], [1, 2, 3]],
    79:[[""],[39], [-15.55, -0.8, -0.1, 1.8, -0.8, 1.9], [1, 2, 3]],
    82:[[""],[10], [-14.55, 2.55, -0.2, 2.5, -0.65, 2.15], [1, 2, 3]],
    91:[[""],[38], [-1.5, 2.0, -0.85, 1.6, -0.1, 3.35], [1, 2, 3]],
    106:[[""],[25], [-21.9, -10.15, -0.1, 2.2, -1.2, 0.95], [1, 2, 3]],
    120:[[""],[39], [-3.1, 2.55, -0.3, 2.2, 1.25, 7.05], [1, 2, 3]],
    164:[[""],[19], [-9.0, 2.7, 2.0, 4.4, 0.15, 1.55], [1, 2, 3]],
    166:[[""],[1], [-5.75, 1.3, -0.35, 1.7, -0.1, 2.05], [1, 2, 3]],
    176:[[""],[], [-8.15, 3.45, 0.6, 2.35, 0.55, -0.6], [1, 2, 3]],
    178:[[""],[1], [-4.0, 3.65, 3.7, 6.2, -0.45, 2.15], [1, 2, 3]],
    181:[[""],[1], [1.35, 0.95, 3.6, 6.2, -0.3, 2.45], [1, 2, 3]],
    183:[[""],[16], [-1.25, 2.0, 0.05, 2.95, 0.9, 5.4], [1, 2, 3]],
    186:[[""],[29], [-12.65, 5.65, 0.6, 2.2, -0.65, 1.15], [1, 2, 3]],
    194:[[""],[25], [-1.8, 2.8, -1.3, -1.2, -0.4, 1.9], [1, 2, 3]],
    196:[[""],[16], [-0.1, 3.85, 0.25, 1.9, -0.85, 2.15], [1, 2, 3]],
    200:[[""],[45], [-36.0, -38.15, 1.45, 1.5, -1.3, 0.95], [1, 2, 3]],
    202:[[""],[29], [-1.45, 5.05, 1.15, 4.5, 0.2, 5.6], [1, 2, 3]],
    210:[[""],[28], [-13.0, 2.7, -0.05, 2.45, -1.15, 1.9], [1, 2, 3]],
    212:[[""],[25], [-4.8, 2.7, 0.6, 5.25, -0.55, 2.3], [1, 2, 3]],
    213:[[""],[17], [-12.9, 0.2, 2.35, 4.3, -1.0, 3.2], [1, 2, 3]],
    215:[[""],[1], [-0.8, 2.5, 1.4, 5.75, -0.4, 2.05], [1, 2, 3]],
    218:[[""],[25,34], [-0.55, 2.2, 0.0, 0.0, -1.45, 2.85], [1, 3]],
    220:[[""],[19,25], [-11.95, 3.4, -0.15, 3.35, 1.45, 2.95], [1, 2, 3]],
    236:[[""],[1], [-4.85, 2.5, -0.4, 2.7, -0.7, 3.35], [1, 2, 3]],
    241:[[""],[30], [-2.3, 1.75, -0.3, 2.2, -0.4, 1.5], [1, 2, 3]],
    242:[[""],[31], [-8.4, 0.85, 0.0, 0.0, 1.65, 1.4], [1, 3]],
    243:[[""],[1,37], [-2.25, 2.05, 1.7, 3.25, -0.15, 1.3], [1, 2, 3]],
    244:[[""],[1,10], [-2.4, 3.0, -0.85, 0.05, 0.55, 3.7], [1, 2, 3]],
    245:[[""],[26], [0.35, 2.3, 4.05, 6.55, -0.05, 4.5], [1, 2, 3]]
  },
  lc:{
    // 0:[[""],[]], // 服なしの選択肢を追加する場合コメントアウト外す
    1:[[""],[1,6,9,16,25,27,39], [-4.9, 2.95]],
    2:[[""],[19,23], [-0.1, 3.3]],
    3:[[""],[19], [-4.4, -0.2]],
    4:[[""],[39], [-0.95, 0.55]],
    7:[[""],[1,3,6,9,13,15,19,25,31,34,39], [-6.45, 0.05]],
    8:[[""],[1,9,13,15,19,25,27,31,34,38], [-0.8, -0.15]],
    9:[[""],[25,38], [-0.55, 1.95]],
    10:[[""],[1,5,6,9,13,15,19,25,27,31,34,39], [-0.35, -0.0]],
    11:[[""],[1,6,9,21,25,27,31,39], [-0.2, -0.0]],
    14:[[""],[9,17], [-12.25, -0.1]],
    15:[[""],[13,25,38], [-5.3, -0.7]],
    16:[[""],[21,27,31], [-0.45, 3.15]],
    19:[[""],[10,32], [-2.35, -0.2]],
    21:[[""],[1], [-17.1, -1.15]],
    33:[[""],[1,19,27,31,38], [-0.6, 2.1]],
    34:[[""],[1,6,9,19,25,29,31,39], [-1.75, 2.2]],
    36:[[""],[1,9,19,25,31,38], [-1.45, 2.4]],
    37:[[""],[15,27,39], [-7.2, 2.95]],
    38:[[""],[1,5,6,9,13,15,19,25,27,31,34,38], [-0.7, -0.1]],
    39:[[""],[1,6,9,19,27,31,34], [-0.65, -0.1]],
    40:[[""],[1,14,17,31], [-12.3, -0.1]],
    45:[[""],[1], [-7.3, -0.2]],
    46:[[""],[1,9,25], [-6.05, -0.3]],
    51:[[""],[1], [-19.05, -8.2]],
    54:[[""],[5], [-2.9, 2.2]],
    90:[[""],[38], [-0.55, 1.3]],
    105:[[""],[25], [-12.05, 3.05]],
    179:[[""],[25], [-22.2, 0.1]],
    187:[[""],[1], [-31.6, -2.05]],
    196:[[""],[24], [-22.0, 0.5]],
    197:[[""],[47], [-17.3, -1.05]],
    198:[[""],[29], [-29.1, -10.6]],
    202:[[""],[38], [-24.4, -2.7]],
    206:[[""],[23], [-11.55, -4.7]],
    208:[[""],[25], [-21.75, -2.1]],
    212:[[""],[6,39], [-0.45, 3.0]],
    214:[[""],[34], [-0.85, 3.05]],
    215:[[""],[29], [-21.05, -2.6]],
    216:[[""],[19], [-13.75, -11.15]],
    219:[[""],[1], [-9.95, -0.8]],
    233:[[""],[1], [-19.9, 1.05]],
    238:[[""],[30], [-0.3, 3.6]],
    240:[[""],[31], [-7.7, -0.35]],
    241:[[""],[25], [-5.95, 1.65]],
    242:[[""],[34], [-2.6, 1.3]]
  },
  sh:{
    0:[[""],[]],
    1:[[""],[1,5,6,9,13,19,25,27,31,34,39], [-0.95, 0.5]],
    2:[[""],[1,5,9,19,25,27,31,39], [-1.55, 0.55]],
    5:[[""],[4], [-1.6, -4.6]],
    7:[[""],[1,39], [-0.5, -9.75]],
    8:[[""],[1,6,9], [-0.5, -9.75]],
    10:[[""],[1,6,13,19,27,31,34,39], [0.6, -10.7]],
    11:[[""],[1,5,6,9,13,15,19,25,27,31,39], [0.85, 0.1]],
    12:[[""],[1,5,6,9,13,15,19,25,27,31,34,39], [-0.45, -2.55]],
    13:[[""],[1,6,9,19,25,27,31,39], [-0.6, -15.7]],
    14:[[""],[1,6,9,16,25,27,39], [0.75, -10.2]],
    15:[[""],[1,6,9,19,25,27,31,34], [1.95, 0.5]],
    16:[[""],[1,6,9,19,25,27,31,39], [2.3, 0.55]],
    17:[[""],[6,19], [0.35, -11.45]],
    18:[[""],[25,31], [1.45, -6.3]],
    19:[[""],[1,19,25], [0.85, -9.55]],
    20:[[""],[1], [1.3, -7.8]],
    21:[[""],[25,34], [0.25, -11.85]],
    22:[[""],[1,39], [0.55, -3.05]],
    23:[[""],[1,25,32], [1.0, -1.1]],
    24:[[""],[39], [1.55, 3.25]],
    25:[[""],[1,17,31,39], [1.2, -2.7]],
    28:[[""],[23], [0.7, -10.45]],
    31:[[""],[8,33], [1.4, -5.65]],
    33:[[""],[33], [1.2, -2.05]],
    35:[[""],[31], [1.2, -7.6]],
    44:[[""],[1,9,13,19,25,27,31], [1.05, -0.05]],
    45:[[""],[7,29,38], [0.6, -10.0]],
    46:[[""],[16], [0.4, 3.5]],
    54:[[""],[36], [-0.9, -8.45]],
    68:[[""],[39], [-2.25, -6.4]],
    74:[[""],[1], [-0.75, -6.15]],
    86:[[""],[38], [0.75, -3.2]],
    99:[[""],[44], [-1.3, -2.9]],
    152:[[""],[31,38], [-0.05, -7.3]],
    159:[[""],[], [0.8, 3.15]],
    160:[[""],[], [0.8, 3.15]],
    181:[[""],[25], [1.25, -10.65]],
    183:[[""],[20], [-0.9, -10.6]],
    185:[[""],[23,39], [0.1, -11.15]],
    187:[[""],[25], [0.85, -11.2]],
    201:[[""],[38], [0.4, -13.25]],
    205:[[""],[29], [1.15, -0.3]],
    206:[[""],[32], [0.8, 0.35]],
    209:[[""],[34], [-0.45, -10.5]],
    210:[[""],[10], [1.05, -8.3]]
  },
  ha :{
    0:[[""],[]],
    1:[[""],[1,6,9,13,16,27,39], [4.15, -11.85]],
    2:[[""],[1,6,27,34], [3.3, -0.5]],
    4:[[""],[5,6,15,25,27,31,38,49], [1.6, -15.8]],
    5:[[""],[5,8,13,19,23,29,38,42], [-6.0, -28.15]],
    6:[["警察","role"],[], [-11.6, -13.65]],
    7:[["医者","role"],[], [-4.2, -11.15]],
    9:[["スナイパー","role"],[], [-8.4, -7.85]],
    10:[["人狼","role"],[], [-13.65, -14.2]],
    11:[["占い師","role"],[], [-12.0, -17.15]],
    12:[["狂人","role"],[], [-10.2, -13.05]],
    13:[["狩人","role"],[], [-11.75, -25.5]],
    16:[["霊能者","role"],[], [-11.85, -41.8]],
    19:[[""],[39], [-7.95, -0.65]],
    20:[[""],[2,13,17,25,34,39,49], [0.2, 9.45]],
    24:[[""],[14,29,39], [6.45, -9.25]],
    25:[[""],[7,25,34,39], [-1.0, -28.55]],
    28:[[""],[1,9,19], [0.05, 0.2]],
    29:[[""],[9,29], [-10.5, -29.75]],
    30:[[""],[1,13,16], [-12.0, -1.2]],
    31:[[""],[25,27], [-6.5, -9.7]],
    32:[[""],[1,39], [-13.15, -6.6]],
    33:[[""],[6,11,39], [1.45, 3.55]],
    35:[[""],[7], [-13.9, -26.4]],
    37:[[""],[1,14], [-9.8, -10.95]],
    38:[[""],[15], [-28.4, -12.0]],
    40:[[""],[19,23], [-10.65, -18.65]],
    52:[[""],[2,6,14,16,19,25,29], [1.3, -4.15]],
    53:[[""],[1,5,6,9,13,15,19,31,39], [-3.1, -7.95]],
    54:[[""],[18,29], [3.55, -1.5]],
    55:[[""],[1,28], [-5.95, -8.25]],
    56:[[""],[1,5,6,10,13,15,19,25,27,31,34,39], [0.05, 0.2]],
    57:[[""],[1,2,5,6,9,13,15,19,25,31,34,39], [23.2, -1.15]],
    58:[[""],[1,6,17,25,34,39], [1.1, 8.3]],
    59:[[""],[1,38], [-8.2, -9.1]],
    60:[[""],[1,6,9,15,19,25,27,34], [22.45, -15.75]],
    62:[[""],[16,25], [-22.0, -3.0]],
    63:[["","sp"],[], [-7.75, -11.8]],
    65:[["","sp"],[], [5.3, -12.5]],
    68:[[""],[1], [-58.3, -61.2]],
    70:[[""],[36], [-15.15, -19.6]],
    84:[[""],[19,31], [-11.5, -19.75]],
    115:[["ボディーガード","role"],[], [-2.55, 23.3]],
    117:[["","sp"],[], [-7.8, -11.8]],
    118:[["","sp"],[], [5.3, -12.5]],
    138:[["愉快犯","role"],[], [-18.4, -0.35]],
    154:[[""],[9], [14.55, -17.15]],
    176:[[""],[18], [-20.35, -37.75]],
    188:[[""],[34], [-3.95, -12.65]],
    200:[[""],[29], [-12.05, -31.25]],
    218:[[""],[29], [-19.45, -16.1]],
    219:[[""],[13], [-20.4, -27.25]],
    227:[[""],[29], [-45.9, -10.6]],
    229:[["雪だるま良","sp"],[], [-47.95, -51.4]],
    230:[["雪だるま悪","sp"],[], [-49.7, -51.0]],
    236:[[""],[25,39], [-12.7, -28.0]],
    239:[[""],[25], [-17.45, -15.2]],
    240:[[""],[19], [-34.5, -9.85]],
    247:[["白猫お面","sp"],[], [-15.65, -17.15]],
    248:[["黒猫お面","sp"],[], [-15.65, -17.15]],
    250:[["赤猫お面","sp"],[], [-15.65, -17.15]],
    259:[[""],[19,29], [-29.35, -21.75]],
    260:[[""],[1], [26.45, -12.1]]
  },
  ba :{
    0:[[""],[]],
    1:[[""],[1,5,6,13,15,19,25,27,31,34], [-30.05, -19.45]],
    2:[[""],[18], [-21.9, -1.95, -0.55, 3.8], [1, 2]],
    3:[[""],[1,13,25,31], [-6.2, -0.0, -0.25, 2.0], [1, 2]],
    4:[[""],[1,6,9,27], [-30.65, -4.65, 1.35, 4.75], [1, 2]],
    5:[[""],[1,5,15,19,27,39], [-28.0, 3.25]],
    6:[[""],[1,15,19], [-15.85, -0.1]],
    7:[[""],[1,6,17,25], [-27.65, -2.5]],
    9:[[""],[5,13,27], [-15.75, -1.95]],
    10:[[""],[1,20,31], [-40.15, -33.05, 1.3, 1.6], [1, 2]],
    11:[[""],[19], [-53.05, -32.15]],
    13:[[""],[1,5,9,13,19,25,27,39], [10.45, 5.75, -21.1, 1.6], [1, 2]],
    14:[[""],[13,25,37], [-51.3, -10.05]],
    15:[[""],[38], [-10.0, -3.5]],
    16:[[""],[6,13,31], [-7.3, -10.85]],
    17:[[""],[1,19,27], [-18.55, 4.45]],
    18:[[""],[9,15,31], [-16.15, -13.9]],
    20:[[""],[1,19,25,33,38,39], [-20.6, -12.65]],
    25:[[""],[1,19,36], [-10.8, 20.55]],
    27:[[""],[10], [-17.8, -14.3]],
    28:[[""],[1,6,9,19,25,27,31,39], [-15.25, -5.9]],
    39:[[""],[1,5,9,19,25,27,31,33,34,38,39,49], [9.05, 16.4]],
    41:[[""],[9,15,25,27,29,31,33,38,39], [-9.45, 1.5]],
    42:[[""],[19,34], [-19.8, -11.0]],
    43:[[""],[1,6,15,19,27,36], [-18.25, -7.25]],
    44:[[""],[1], [-37.9, -20.3]],
    45:[[""],[1,5,13,19,31,39], [-26.7, -19.65, 4.35, 1.9], [1, 2]],
    47:[[""],[1,39], [-16.5, 2.7]],
    48:[[""],[1,19,25,28], [-7.95, 5.9, 3.1, 0.75], [1, 2]],
    49:[[""],[25], [-20.4, -42.5]],
    66:[[""],[32], [-7.35, -1.2], [2]],
    78:[[""],[25], [-34.9, 7.8]],
    113:[[""],[37], [8.2, 21.4, -42.7, 7.8], [1, 2]],
    129:[[""],[20], [-6.55, -32.1]],
    158:[[""],[15], [-44.05, -2.05]],
    165:[[""],[34], [28.35, 28.8]],
    166:[[""],[29], [-58.8, -5.45]],
    169:[[""],[25], [12.55, 27.8]],
    179:[[""],[30], [-32.7, 7.3, -46.85, -45.9], [1, 2]],
    184:[[""],[1], [16.45, 22.75]],
    189:[[""],[25], [-54.45, -31.35]],
    192:[[""],[6], [-51.5, -35.6]],
    193:[[""],[34], [-53.2, 21.35]],
    198:[[""],[19], [22.1, 18.05]],
    199:[[""],[1], [-22.55, 2.05, -20.75, -7.4], [1, 2]],
    204:[[""],[], [0.0, 0.0, -36.5, -21.4], [2]]
  },
  hair :{
    1:[[""],[1,5,6,7,13,15,19,25,27,29,31,33,34,39,49], [-6.15, 4.85, -5.9, -7.85], [1, 2]],
    2:[[""],[1,4,6,7,9,13,15,19,25,29,31,33,34,39,49], [-0.9, -0.0, -3.7, 0.65], [1, 2]],
    3:[[""],[5,7,15,19,25,27,29,30,34,39], [-1.85, -9.1, -6.55, -16.55], [1, 2]],
    4:[[""],[1,5,6,7,9,13,15,19,25,27,29,31,33,34,39], [-1.65, -9.15, -5.2, -2.4], [1, 2]],
    5:[[""],[2,6,7,19,29,33,39], [-10.05, -0.3, -4.0, -25.7], [1, 2]],
    6:[[""],[17,33,49], [-4.15, -13.2, 0.2, -11.55], [1, 2]],
    7:[[""],[5,7,31,39], [-22.7, -42.5, -4.65, -6.3], [1, 2]],
    8:[[""],[1,5,30,39], [-5.05, -18.35, -5.05, -18.35], [2]],
    9:[[""],[1,6,7,11,13,15,25,29,31,33,34,39], [-7.75, -5.85, -7.75, -5.85], [2]],
    10:[[""],[1,6,9,19,25,27,33,34,39], [-5.8, -2.5, -5.8, -15.0], [2]],
    11:[[""],[1,5,6,7,9,13,15,27,29,39,49], [0.0, 0.0, -5.7, -5.35], [2]],
    12:[[""],[5,9,13,25,33,34,46,49], [-10.55, -35.15, -2.8, -12.45], [1, 2]],
    13:[[""],[7,9,13,15,25,27,29,31,34,39], [-7.1, -11.8, -2.85, -10.45], [1, 2]],
    14:[[""],[7,13,15,49], [-10.2, -12.7, 0.55, -0.0], [1, 2]],
    15:[[""],[1,7,11,13,15,25,27,33,49], [2.9, 6.45, -2.4, -5.0], [1, 2]],
    16:[[""],[5,31,33], [2.25, 6.45, -1.45, -1.95], [1, 2]],
    17:[[""],[1,5,6,7,9,13,15,27,30,31,34,39,49], [1.55, -1.5, -2.3, -9.85], [1, 2]],
    18:[[""],[6,9,19,25,27,29,31,33,34,38,39,49], [1.6, -1.5, -5.5, -11.6], [1, 2]],
    19:[[""],[6,38,49], [-1.35, -5.95, -11.15, -14.05], [1, 2]],
    20:[[""],[25,34], [-1.35, -6.2, -7.2, -9.0], [1, 2]],
    21:[[""],[1,34], [-16.2, 2.0, -12.7, -14.3], [1, 2]],
    62:[[""],[34], [-18.15, -22.1, -7.6, -11.95], [1, 2]],
    105:[[""],[7], [-40.25, -16.35, 1.7, 4.45], [1, 2]],
    115:[[""],[1], [-5.6, -33.0, -8.5, -14.05], [1, 2]],
    128:[[""],[], [0.0, 0.0, 3.7, 2.75], [2]],
    129:[[""],[29], [-4.4, -53.35, -8.15, -6.45], [1, 2]],
    139:[[""],[25], [-5.85, -26.35, -3.6, -0.4], [1, 2]],
    142:[[""],[6], [-4.45, -27.0, -4.5, -2.0], [1, 2]],
    144:[[""],[29], [-30.3, -34.65, 0.15, -0.7], [1, 2]],
    160:[[""],[34], [0.0, 0.0, -29.7, -7.45], [2]],
    167:[[""],[25,33], [-6.0, -41.0, -0.1, -0.5], [1, 2]],
    168:[[""],[25,29,34], [-7.6, -27.9, -17.3, -14.6], [1, 2]],
    170:[[""],[6,14], [-35.05, -27.65, -19.65, 2.85], [1, 2]],
    171:[[""],[9], [-45.15, -32.4, 2.4, 0.95], [1, 2]],
    181:[[""],[46], [-31.6, -30.6, -3.3, -2.15], [1, 2]],
    185:[[""],[31], [-7.7, -24.15, 1.5, -0.0], [1, 2]],
    189:[[""],[9,25], [-3.1, -30.95, -0.8, -3.6], [1, 2]],
    190:[[""],[35,48], [-23.25, -39.55, -0.3, -8.2], [1, 2]]
  },
  face:{
    1:[[""],[]],2:[[""],[]],3:[[""],[]],4:[[""],[]],7:[[""],[]]
  },
  ff:{
    0:[[""],[]],1:[[""],[]],2:[[""],[]],3:[[""],[]],4:[[""],[]],5:[[""],[]],
    8:[[""],[]],9:[[""],[]],13:[[""],[]],14:[[""],[]]
  },
  eb:{
    1:[[""],[]],2:[[""],[]],3:[[""],[]],4:[[""],[]],5:[[""],[]],6:[[""],[]],
    7:[[""],[]],8:[[""],[]],9:[[""],[]],10:[[""],[]],11:[[""],[]],12:[[""],[]],
    13:[[""],[]],16:[[""],[]],17:[[""],[]],20:[[""],[]],21:[[""],[]],22:[[""],[]]
  },
  eye:{
    1:[[""],[1,5,10,11,24], [0.25, -0.35, -2.95, -0.35]],
    2:[[""],[1,10,16,23,24,31,36], [0.9, -0.95, -2.2, -0.95]],
    3:[[""],[1,5,10,16,20,23,31,38], [2.3, -1.45, -3.25, -1.45]],
    4:[[""],[1,8,10,23,31], [2.2, -0.1, -3.5, -0.05]],
    5:[[""],[10,15,23,25,31,37], [1.35, -0.65, -3.1, -0.55]],
    6:[[""],[3,5,10,11,16,20,23,25,31,37], [1.65, 0.45, -2.65, 0.45]],
    7:[[""],[23,25,31,36], [3.35, -1.0, -3.05, -1.0]],
    8:[[""],[1,5,9,14,15,20,23,25,31,37], [2.2, 0.6, -2.95, 0.6]],
    9:[[""],[37], [-1.0, -0.0, -2.9, -0.0]],
    10:[[""],[23,24], [-1.0, -0.8, -2.15, -0.8]],
    11:[[""],[4,14,25], [1.15, -1.75, -1.45, -1.75]],
    12:[[""],[1,14,15,23,25], [-0.0, 0.4, -2.35, 0.4]],
    13:[[""],[2,11,21,23,24,38], [2.85, 0.1, -2.95, -0.0]],
    14:[[""],[10,16,21,23,25,31], [3.2, 1.2, -3.4, 1.3]],
    15:[[""],[1,5,14,16,21,23,25,31,36], [3.4, 2.4, -3.75, 2.1]],
    16:[[""],[1,14,16,21,23,31,37], [3.0, 1.35, -3.55, 1.35]],
    17:[[""],[16,20,23,31,37], [3.05, -0.55, -3.15, -0.65]],
    18:[[""],[1,16,21,32,38], [2.6, -0.15, -3.0, -0.25]],
    22:[[""],[1,5,10,13,16,20,23,37], [-0.0, 0.4, -2.35, 0.4]],
    48:[[""],[1], [2.25, 1.55, -3.1, 1.55]],
    101:[[""],[24], [0.3, 1.45, -1.75, 1.45]],
    116:[[""],[25], [1.2, -0.0, -2.55, -0.0]],
    130:[[""],[13], [3.2, 1.15, -3.0, 1.15]],
    136:[[""],[5], [2.8, 1.7, -1.05, 1.7]],
    141:[[""],[25], [2.3, 0.9, -2.7, 0.9]],
    146:[[""],[13], [0.45, -0.2, -4.25, -0.2]],
    149:[[""],[25], [2.25, 0.9, -3.25, 0.9]],
    151:[[""],[15], [-4.45, -2.35, -3.9, -2.35]],
    158:[[""],[1], [-2.55, 2.55, -2.45, 2.45]],
    160:[[""],[9], [1.95, 1.75, -2.0, 1.75]],
    166:[[""],[1,11,22], [1.3, -1.05, -3.3, -1.05]],
    167:[[""],[15], [1.1, -0.7, -3.1, -0.7]]
  },
  mouth:{
    1:[[""],[]],2:[[""],[]],3:[[""],[]],4:[[""],[]],5:[[""],[]],6:[[""],[]],
    7:[[""],[]],8:[[""],[]],9:[[""],[]],10:[[""],[]],17:[[""],[]],29:[[""],[]],
    33:[[""],[]],34:[[""],[]],35:[[""],[]],36:[[""],[]],39:[[""],[]],
    41:[[""],[]],47:[[""],[]],51:[[""],[]],52:[[""],[]],53:[[""],[]],54:[[""],[]]
  },
  skin:{
    "none":[[""],[40,41,42,43,44,45,46,47]]
  }
}

document.getElementById( 'change_all' ).addEventListener( "click", function(e){
  ApplyTotalValue();
  MakeTotalValue();
} );

document.getElementById( 'copy_all').addEventListener( "click",function(e){
  navigator.clipboard.writeText( document.getElementById( "TotalValue" ).value );

});

// カンマ区切りにしているのでカンマは不可にする。
document.getElementById("input_avatarname").addEventListener("keydown", function(e){
  if( e.key == "," ){ e.preventDefault(); }
});

// ペーストは無効にする(ややこしいので)
document.getElementById("input_avatarname").addEventListener("paste", function(e){
  e.preventDefault();
});

document.getElementById("input_avatarname").addEventListener( "input", function(e){
  var enable = false;
  const avatar_btns = document.getElementById( "avatar_list" ).childNodes;
  for( let i = 0; i < avatar_btns.length; i++ ){
    if( avatar_btns[i].value == e.target.value ){
      enable = true;
      break;
    }
  }
  document.getElementById("remove_avatar").disabled = enable ? null : "disabled";
});

// ユーザが保存したアバターリストをローカルストレージから取得する
function LoadAllAvatarList(){
  try{
    var value = window.localStorage.getItem("AvatarList");
    if( value != null ){
      const splitData = value.split(",");
      for( let i = 0; i< splitData.length; i++ ){
        // カスタムアバターのKeyはあるハズだが、念のため確認し、なかったら何もしない。
        if( null != window.localStorage.getItem("CustomAvatar"+splitData[ i ]) ){
          const btn = document.createElement( "input" );
          btn.type = "button";
          btn.id = "btn_loadavatar" + splitData[ i ];
          btn.value = splitData[ i ];
          btn.addEventListener( "click", { avatarname:splitData[i], handleEvent:LoadAvatarSettings } );
          document.getElementById( "avatar_list" ).appendChild(btn);
          document.getElementById( "avatar_list" ).appendChild(document.createTextNode(" "));
        }
      }
    }
  }catch(err){
  }
}

document.getElementById("save_avatar").addEventListener( "click", function (){
  var avatarname = document.getElementById("input_avatarname").value;
  if( null == avatarname || "" == avatarname ){ return; }
  try{
    // すでにあったら、値のみ変更
    if( null != window.localStorage.getItem("CustomAvatar"+avatarname)){
      window.localStorage["CustomAvatar"+avatarname] = GetTotalValue();
      return;
    }
    window.localStorage["CustomAvatar"+avatarname] = GetTotalValue();
    var value = window.localStorage.getItem("AvatarList");
    value = ( null == value ) ? avatarname : value + "," + avatarname;
    window.localStorage["AvatarList"] = value;

    const btn = document.createElement( "input" );
    btn.type = "button";
    btn.id = "btn_loadavatar" + avatarname;
    btn.value = avatarname;
    btn.addEventListener( "click", {avatarname:avatarname, handleEvent:LoadAvatarSettings } );
    document.getElementById( "avatar_list" ).appendChild(btn);
    document.getElementById( "avatar_list" ).appendChild(document.createTextNode(" "));
    document.getElementById("remove_avatar").disabled = null;
  }catch(err){
    alert( "保存できませんでした");
  }
});

function LoadAvatarSettings(){
  try{
    var value = window.localStorage.getItem("CustomAvatar" + this.avatarname);
    if( value != null ){
      document.getElementById("input_avatarname").value = this.avatarname;
      ApplyTotalValue( value );
      MakeTotalValue();
      document.getElementById("remove_avatar").disabled = null;
    }else{
      console.log("保存されていません");
    }
  }catch(err){
  }
}

document.getElementById("remove_avatar").addEventListener( "click",function(){
  var avatarname = document.getElementById("input_avatarname").value;
  if( avatarname == "" ){ return; }
  try{
    var value = window.localStorage.getItem( "CustomAvatar" + avatarname );
    // エディットでの文字列が登録されている文字列にあった場合のみ削除
    if( value != null ){
      window.localStorage.removeItem("CustomAvatar" + avatarname );
      var value = window.localStorage.getItem("AvatarList");
      var splitData = value.split(",");
      for( let i = 0; i < splitData.length; i++ ){
        if( splitData[i]==avatarname){
          splitData.splice(i,1);
          break;
        }
      }
      if( 0 == splitData.length ){
        window.localStorage.removeItem("AvatarList");
      }else{
        value = splitData.join(",");
        window.localStorage["AvatarList"] = value;
      }
      document.getElementById("btn_loadavatar" + avatarname).removeEventListener("click",LoadAvatarSettings);
      document.getElementById("btn_loadavatar" + avatarname).remove();
      document.getElementById("remove_avatar").disabled = "disabled";
    }
  }catch(err){
  }
});

document.getElementById("clear_avatar").addEventListener( "click", function(){
  var ret = window.confirm("すべて削除されます。よろしいですか？");
  if( false == ret ){ return; }
  window.localStorage.clear();
  const avatar_btn = document.getElementById( "avatar_list" );
  while( avatar_btn.firstChild ){
    if( avatar_btn.firstChild.nodeType === Node.ELEMENT_NODE){
      avatar_btn.firstChild.removeEventListener("click", LoadAvatarSettings );
    }
    avatar_btn.removeChild( avatar_btn.firstChild );
  }
  document.getElementById("remove_avatar").disabled = "disabled";
});

document.getElementById("initial_avatar_male").addEventListener( "click", function(){
  ApplyTotalValue("8,1,8,1,1,1,0,11,0,31,2,4,1,0,1,8,1,1,46,男");
});

document.getElementById("initial_avatar_female").addEventListener( "click", function(){
  ApplyTotalValue("7,1,7,1,10,1,0,1,0,1,1,33,4,0,6,6,37,2,40,女");
});

document.getElementById("npc_avatar").addEventListener( "click", function(){
  ApplyTotalValue("1,1,1,1,1,1,0,1,0,1,1,7,4,0,1,1,1,1,40,女");
});

function GetTotalValue(){
  var value
   = PartsNo["uc"] + "," + PartsCol["uc"] + ","
   + PartsNo["lc"] + "," + PartsCol["lc"] + ","
   + PartsNo["sh"] + "," + PartsCol["sh"] + ","
   + ( roles.includes( PartsNo["ha"]) ? before_role_han : PartsNo["ha"] ) + "," + PartsCol["ha"] + ","
   + PartsNo["ba"] + "," + PartsCol["ba"] + ","
   + PartsNo["hair"] + "," + PartsCol["hair"] + ","
   + PartsNo["face"] + "," + PartsNo["ff"] + "," + PartsNo["eb"] + ","
   + PartsNo["eye"] + "," + PartsCol["eye"] + ","
   + PartsNo["mouth"] + "," + PartsCol["skin"] + ","
   + gender + ","
   + document.getElementById( "input_title" ).value + ","
   + document.getElementById( "input_nickname" ).value + ","
   + document.getElementById( "input_uid" ).value + ","
   + document.getElementById( "input_money" ).value + ","
   + document.getElementById( "input_funcoin" ).value + ","
   + document.getElementById( "input_rating" ).value + ","
   + document.getElementById( "input_stonepoint" ).value + ","
   + document.getElementById( "input_rubypoint" ).value + ","
   + document.getElementById( "input_keypoint" ).value;
   return value;
}

function MakeTotalValue(){
  document.getElementById( "TotalValue").value = GetTotalValue();
}

function ApplyTotalValue( value ){
  var totalValue = null == value ? document.getElementById( "TotalValue" ).value : value;
  console.log("TotalValue: " + totalValue);
  const splitData = totalValue.split(",");
  if( splitData.length < 19 ){ return; }
  ChangePartsNo( "uc", splitData[0] );
  ChangePartsColor( "uc", splitData[1] );
  ChangePartsNo( "lc", splitData[2] );
  ChangePartsColor( "lc", splitData[3] );
  ChangePartsNo( "sh", splitData[4] );
  ChangePartsColor( "sh", splitData[5]);
  ChangePartsNo( "ha", splitData[6] );
  ChangePartsColor( "ha", splitData[7] );
  ChangePartsNo( "ba", splitData[8] );
  ChangePartsColor( "ba", splitData[9] );
  ChangePartsNo( "hair", splitData[10] );
  ChangePartsColor( "hair", splitData[11] );
  ChangePartsNo( "face", splitData[12] );
  ChangePartsNo( "ff", splitData[13] );
  ChangePartsNo( "eb", splitData[14] );
  ChangePartsNo( "eye", splitData[15] );
  ChangePartsColor( "eye", splitData[16] );
  ChangePartsNo( "mouth", splitData[17] );
  ChangePartsColor( "skin", splitData[18] );

  if( splitData.length >= 20 ){
    ChangeGender( splitData[19] );
  }
  if( splitData.length >= 21 ){
    document.getElementById( "input_title" ).value = splitData[20];
    document.getElementById( "Title" ).textContent = splitData[20];
  }
  if( splitData.length >= 22 ){
    document.getElementById( "input_nickname" ).value = splitData[21];
    document.getElementById( "NickName" ).textContent = splitData[21];
  }

  if( splitData.length >= 23 ){
    document.getElementById( "input_uid" ).value = splitData[22];
    document.getElementById( "Uid" ).textContent = splitData[22];
  }
  const edit = [ "money", "funcoin", "rating", "stonepoint", "rubypoint", "keypoint" ];
  const svg =  [ "Money", "FunCoin", "Rating", "StonePoint", "RubyPoint", "KeyPoint" ];
  for( let i = 0; i < 6; i++ ){
    index = i + 23;
    if( splitData.length > index && "" != splitData[index] && !isNaN(splitData[index])){
      document.getElementById( "input_" + edit[i] ).value = splitData[index];
      document.getElementById( svg[i] ).textContent = parseInt(splitData[index]).toLocaleString();
    }
  }
}

const BtnRandom = document.getElementById('btn_random');
BtnRandom.addEventListener( 'click', function(){
  RandomAvatar();
});

function RandomAvatar() {
  Object.keys(PartsTbl).forEach( function(key){
    // それぞれのパーツの番号リストを配列に格納
    var parts_no_list = Object.keys(PartsTbl[key]);
    var randno = parts_no_list[ Math.floor( Math.random() * parts_no_list.length ) ];
    if( key == 'ha'){
      while(roles.includes(parseInt(randno)) ){
        randno = parts_no_list[ Math.floor( Math.random() * parts_no_list.length ) ];
      }
    }
    if( 2 <= parts_no_list.length ){
      ChangePartsNo( key, randno );
    }
    if( 0 != PartsTbl[key][randno][1].length ){
      var randcol = PartsTbl[key][randno][1][ Math.floor( Math.random() * PartsTbl[key][randno][1].length ) ];
      ChangePartsColor( key, randcol );
    }
  });
}

// <input type="button" class="change_ucn" id="btn_ucn1">
// アバター選択のボタンを作る
Object.keys(PartsTbl).forEach( function(key){
  // それぞれのパーツの番号リストを配列に格納
  var parts_no_list = Object.keys(PartsTbl[key]);
  var parts_col_flag = Array(50).fill(false);
  for( let i = 0; i < parts_no_list.length; i++ ){
    var no = parts_no_list[i];
    if("none" != no){
      const btn = document.createElement( "input" );
      btn.classList.add( "change_" + key + "n" );
      btn.type = "button";
      btn.id = "btn_" + key + "n" + no;
      btn.value = "" != PartsTbl[key][no][0][0] ? PartsTbl[key][no][0][0] : ( 0 == parseInt(no) ) ? "なし" : no;
      btn.addEventListener('click', function() { ChangePartsNo( key, parts_no_list[i] ); });
      var list_btn = "list_btn_" + key + "n";
      if( 2 == PartsTbl[key][no][0].length ){ list_btn += PartsTbl[key][no][0][1]; } // リストを分ける場合にPartsTblにsuffixを設定して取得
      document.getElementById( list_btn ).appendChild(btn);
      document.getElementById( list_btn ).appendChild(document.createTextNode(" "));
    }
    // 存在する色番号にフラグを立てる
    for( let j = 0; j < PartsTbl[key][no][1].length; j++ ){
      parts_col_flag[PartsTbl[key][no][1][j]] = true;
    }
  }
  for( let j = 0; j < parts_col_flag.length; j++ ){
    if( true == parts_col_flag[ j ] ){
      const btn = document.createElement( "input" );
      btn.classList.add( "change_" + key + "c" );
      btn.type = "button";
      btn.id = "btn_" + key + "c" + j;
      btn.value = j;
      btn.style = "background-color:"+color_table[j][0]+";border:2px solid "+color_table[j][1];
      btn.addEventListener('click', function() { ChangePartsColor( key, j ); });
      document.getElementById( "list_btn_" + key + "c" ).appendChild(btn);
      document.getElementById( "list_btn_" + key + "c" ).appendChild(document.createTextNode(" "));
    }
  }
});

const BtnInOrder = document.getElementsByClassName("change_inorder");
for(let i = 0; i < BtnInOrder.length; i++ ){
  BtnInOrder[i].addEventListener("click", function(){
    var key = this.getAttribute("id").slice(4);
    var inc = ( "prev" == key.slice(-4) ) ? false : true;
    key = key.slice(0,-5);
    if( "n" == key.slice(-1)){
      key = key.slice(0,-1);
      var parts_no_list = Object.keys(PartsTbl[key]);
      var parts_no = ( "ha" == key && roles.includes(PartsNo[key]) ) ? before_role_han : PartsNo[key];
      var index = -1;
      for( let j = 0; j < parts_no_list.length; j++ ){
        if( parseInt(parts_no_list[j]) == parts_no ){
          index = j;
          break;
        }
      }
      if( -1 == index ){
        console.log("パーツがありません");
        if( inc ){
          index = 0;
        }else{
          index = parts_no_list.length - 1;
        }
        // return;
      }else{
        if( inc ){
          if( parts_no_list.length - 1 == index ){
            index = 0;
          }else{
            index++;
          }
        }else{
          if( 0 == index ){
            index = parts_no_list.length - 1;
          }else{
            index--;
          }
        }
      }
      if( "ha" == key ){
        while( roles.includes(parseInt(parts_no_list[index]))){
          if( inc ){
            index++;
          }else{
            index--;
          }
        }
      }
      ChangePartsNo(key,parts_no_list[index]);
    }else if( "c" == key.slice(-1)){
      key = key.slice(0,-1);
      var index = -1;
      var partskey = ( "skin" == key ) ? "none" : PartsNo[key];
      for( let j = 0; j < PartsTbl[key][partskey][1].length; j++ ){
        if( parseInt(PartsTbl[key][partskey][1][j]) == PartsCol[key] ){
          index = j;
          break;
        }
      }
      if( -1 == index ){
        console.log("色がありません");
        return;
      }
      if( inc ){
        if( PartsTbl[key][partskey][1].length - 1 == index ){
          index = 0;
        }else{
          index++;
        }
      }else{
        if( 0 == index ){
          index = PartsTbl[key][partskey][1].length - 1;
        }else{
          index--;
        }
      }
      ChangePartsColor(key,PartsTbl[key][partskey][1][index]);
    }
  });
}

const BtnNoList = {
  uc:document.getElementsByClassName('change_ucn'),
  lc:document.getElementsByClassName('change_lcn'),
  sh:document.getElementsByClassName('change_shn'),
  ha:document.getElementsByClassName('change_han'),
  ba:document.getElementsByClassName('change_ban'),
  hair:document.getElementsByClassName('change_hairn'),
  face:document.getElementsByClassName('change_facen'),
  ff:document.getElementsByClassName('change_ffn'),
  eb:document.getElementsByClassName('change_ebn'),
  eye:document.getElementsByClassName('change_eyen'),
  mouth:document.getElementsByClassName('change_mouthn')
}

document.getElementById( "btn_rolenone").addEventListener('click', function(){
  // 役職パーツなしにした場合は元のパーツに戻す
  if( roles.includes(PartsNo["ha"])){
    ChangePartsNo( "ha", before_role_han );
  }
});

function ChangePartsNo( key, param ){
  // 今回役職のパーツが設定されて、前回は役職でなかった場合は、前回のパーツを保持しておく
  if( key == "ha" ){
    if(roles.includes(parseInt(param)) && !roles.includes(PartsNo[key]) ){
      before_role_han = PartsNo[key];
    }
  }
  PartsNo[key] = parseInt(param);
  document.getElementById( key + "n_no" ).textContent = PartsNo[key];
  for( let i = 0; i < BtnNoList[key].length; i++ ){
    var bSelect = parseInt( BtnNoList[key][i].getAttribute("id").slice(key.length+5) ) == PartsNo[key]; 
    BtnNoList[key][i].style =
    "border:"+ ( bSelect ? "2px solid " + btn_select_color : "" )
    +";font-weight:" + ( bSelect ? "bold" : "normal" )
    +";border-radius:" + ( bSelect ? "8px" : "" );
  }
  MakeTotalValue();
  SvgId[key][1].forEach( function( elem ){
    if( Array.isArray(elem)){
      document.getElementById( elem[0]+"_Main" ).setAttribute("xlink:href", PartsFile.includes(key) ? "#"+elem[1]+"_Org" : "0" == PartsNo[key] ? "#shape_None" : "#"+elem[1]+"_"+PartsNo[key]);
    }else{
      document.getElementById( elem+"_Main" ).setAttribute("xlink:href", PartsFile.includes(key) ? "#"+elem+"_Org" : "0" == PartsNo[key] ? "#shape_None" : "#"+elem+"_"+PartsNo[key]);
    }
  });
  if( PartsFile.includes(key) ){
    for( var i = 1; i <= 49; i++ ){
      if( null != document.getElementById("btn_"+key+"c"+i) ){
        document.getElementById("btn_"+key+"c"+i).style.display
        = PartsNo[key] in PartsTbl[key] ? ( PartsTbl[key][PartsNo[key]][1].includes(i) ? "" : "none" ) : "none";
      }
    }
    if( PartsNo[key] in PartsTbl[key] ){
      if( !PartsTbl[key][PartsNo[key]][1].includes(PartsCol[key])){
        if( 0 != PartsTbl[key][PartsNo[key]][1].length){
          ChangePartsColor( key, PartsTbl[key][PartsNo[key]][1][0]);
        }else{
          document.getElementById( key + "c_no" ).textContent = "-";
          document.getElementById( key + "c_no" ).setAttribute( "bgcolor", "" );
          document.getElementById( key + "c_no" ).style.color = "#ffffff";
        }
      }
    }
    if( PartsNo[key] in PartsTbl[key] ){
      if( PartsTbl[key][PartsNo[key]][1].length <= 1 ){
        document.getElementById("btn@"+key+"c_prev").disabled = "disabled";
        document.getElementById("btn@"+key+"c_next").disabled = "disabled";
        document.getElementById("btn_"+key+"c_prev").disabled = "disabled";
        document.getElementById("btn_"+key+"c_next").disabled = "disabled";
      }else{
        document.getElementById("btn@"+key+"c_prev").disabled = null;
        document.getElementById("btn@"+key+"c_next").disabled = null;
        document.getElementById("btn_"+key+"c_prev").disabled = null;
        document.getElementById("btn_"+key+"c_next").disabled = null;
      }
    }
    ChangeSvgFile(key);
  }
}

const BtnColList = {
  uc:document.getElementsByClassName('change_ucc'),
  lc:document.getElementsByClassName('change_lcc'),
  sh:document.getElementsByClassName('change_shc'),
  ha:document.getElementsByClassName('change_hac'),
  ba:document.getElementsByClassName('change_bac'),
  hair:document.getElementsByClassName('change_hairc'),
  eye:document.getElementsByClassName('change_eyec'),
  skin:document.getElementsByClassName('change_skinc')
}

function ChangePartsColor( key, param ) {
  PartsCol[key] = parseInt(param);
  document.getElementById( key + "c_no" ).textContent = PartsCol[key];
  document.getElementById( key + "c_no" ).setAttribute( "bgcolor", color_table[PartsCol[key]][0] );
  document.getElementById( key + "c_no" ).style.color = color_table[PartsCol[key]][2];
  for( let i = 0; i < BtnColList[key].length; i++ ){
    var cno = BtnColList[key][i].getAttribute("id").slice(key.length+5);
    var disp = BtnColList[key][i].style.display;
    var bSelect = parseInt( cno ) == PartsCol[key] ; 
    BtnColList[key][i].style = "background-color:"+color_table[cno][0]
    +";border:"+ ( bSelect ? "3" : "2" ) + "px solid "+ ( bSelect ? btn_select_color : color_table[cno][1] )
    +";color:" + color_table[cno][2]
    +";font-weight:" + ( bSelect ? "bold" : "normal" )
    +";border-radius:" + ( bSelect ? "8px" : "" )
    +";display:" + disp;
  }
  MakeTotalValue();
  if( PartsFile.includes(key) ){
    ChangeSvgFile(key); 
  }else if( key == "skin"){
    // インラインsvgで色を変えるのは今のところskinだけになったのでここで変更
    var poly = document.getElementsByClassName("Skin_Main");
    for(let i = 0; i < poly.length; i++ ){
      poly[i].setAttribute("fill", color_table[PartsCol[key]][0]);
    };
    poly = document.getElementsByClassName("Skin_Nose");
    for(let i = 0; i < poly.length; i++ ){
      poly[i].setAttribute("fill", color_table[PartsCol[key]][1]);
    };
  }
}

function ChangeSvgFile( key ){
  if( 0 != PartsNo[key] && !(PartsNo[key] in PartsTbl[key])){
    console.log("パーツ番号がない！");
    return;
  }
  // 0 のときは非表示にするのでcolnoはなんでもよい。
  var colno = 0 == PartsNo[key] ? 0 : PartsTbl[key][PartsNo[key]][1].length == 0 ? 0 : PartsCol[key];
  // console.log("ChangeSvgFile: " + key + " " + PartsNo[key] + " " + colno);

  for(let pos = 0; pos < SvgId[key][1].length; pos++){
    var idstr = ( Array.isArray(SvgId[key][1][pos]) ? SvgId[key][1][pos][1] : SvgId[key][1][pos] ) + "_OrgRef";
    if( 0 == PartsNo[key] ){
      // 0のときはなし
      document.getElementById( idstr ).setAttribute("xlink:href", "" );
    }else{
      // パーツ番号リストがない場合は、単一のパーツなので番号がない
      if( 3 == PartsTbl[key][PartsNo[key]].length){
        // 目だけフォルダ構成違うのでここで指定
        if( "eye" == key ){
          document.getElementById( idstr ).setAttribute("xlink:href", "./onlinedata/Parts/"+SvgId[key][0]+"/"+SvgId[key][0]+ ( pos < 3 ? "_L_" : "_R_" ) + PartsNo[key]+"_"+colno+"/"+ ( pos % 3 + 1 ) + ".svg" );
        }else{
          if( 0 != colno){
            document.getElementById( idstr ).setAttribute("xlink:href", 0 == pos ?"./onlinedata/Parts/"+SvgId[key][0]+"/"+SvgId[key][0]+"_"+PartsNo[key]+"_"+colno+".svg" : "");
          }else{
            document.getElementById( idstr ).setAttribute("xlink:href", 0 == pos ? "./onlinedata/Parts/"+SvgId[key][0]+"/"+SvgId[key][0]+"_"+PartsNo[key]+".svg" : "");
          }
        }
      }else{
        // パーツ番号リストがある場合は、そのパーツ番号が含まれているか見て含まれていたら設定する
        document.getElementById( idstr ).setAttribute("xlink:href", PartsTbl[key][PartsNo[key]][3].includes(pos+1) ? "./onlinedata/Parts/"+SvgId[key][0]+"/"+SvgId[key][0]+"_"+PartsNo[key]+"_"+colno+"_"+(pos+1)+".svg" : "");
      }
    }
    if( key == "sh" ){ break; }
  }
  if( 0 != PartsNo[key] ){
    if( "eye" == key ){
      for( let p = 0; p < 2; p++ ){
        for( let i = 0; i < 3; i++ ){
          document.getElementById(SvgId[key][1][p*3+i]+"_OrgRef").setAttribute("transform",
           "translate("+PartsTbl[key][PartsNo[key]][2][p*2]+", "+PartsTbl[key][PartsNo[key]][2][p*2+1]+")");
        }
      }
    }else{
      for( let p = 0; p < PartsTbl[key][PartsNo[key]][2].length / 2; p++){
          document.getElementById( (Array.isArray(SvgId[key][1][p]) ? SvgId[key][1][p][1] :SvgId[key][1][p] )+"_OrgRef")
          .setAttribute("transform", "translate("+PartsTbl[key][PartsNo[key]][2][p*2]+", "+PartsTbl[key][PartsNo[key]][2][p*2+1]+")");
      }
    }
  }
}

const BtnEyeBlink = document.getElementsByClassName('eye_blink');
for (let i = 0; i < BtnEyeBlink.length; i++) {
  BtnEyeBlink[i].addEventListener('click', function() {
    EyeBlink( this.getAttribute("value") == "あり" );
  });
}

function EyeBlink( isBlink ){
  if( isBlink ){
    document.getElementById( "EyeL_Move" ).setAttribute("xlink:href", "#EyeL_Blink");
    document.getElementById( "EyeR_Move" ).setAttribute("xlink:href", "#EyeR_Blink");
  }else{
    document.getElementById( "EyeL_Move" ).setAttribute("xlink:href", "#EyeL_Stop");
    document.getElementById( "EyeR_Move" ).setAttribute("xlink:href", "#EyeR_Stop");
  }
}

const BtnGender = document.getElementsByClassName('change_gender');
for (let i = 0; i < BtnGender.length; i++) {
  BtnGender[i].addEventListener('click', function() {
    ChangeGender( this.getAttribute("value") );
  });
}

function ChangeGender( param ){
  gender = param;
  for( let i = 0; i < BtnGender.length; i++ ){
    var bSelect = BtnGender[i].getAttribute("value") == gender; 
    BtnGender[i].style =
    "border:"+ ( bSelect ? "2px solid " + btn_select_color : "" )
    +";font-weight:" + ( bSelect ? "bold" : "normal" )
    +";border-radius:" + ( bSelect ? "8px" : "" );

  }
  MakeTotalValue();
  document.getElementById( "GenderColor" ).setAttribute("fill", gender == "男" ? "#016a9c" : "#ae004a");
  document.getElementById( "GenderImage" ).setAttribute("xlink:href", gender == "男" ?
  "data:image/PNG;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAYCAYAAAD+vg1LAAAFOUlEQVR42qWVeVBTVxTGXztTBQ11qQ6CiJSQROpIqRbsgooYlkAIWqVThla7jBZHlM5US6tAAZeCMloouIRFQFRksUDYgkSxaJVFQhBokJAAQkAERsgACYhf73vOdOy4lXpm7rz3z/3d757znXMpagrhYUNNp786nc5uaGiIS71KOFlSczxsWJt87Reosk8dLevX3sXDxzEKEuSrMBgMvlOCeloZLXYxo8rjQ3YSxCOag5iSCmxKyoYwNgX+CWkovKWAbnSMPkD+UuAKM2qGJ8fkS3erN9Tf+zozQIVKgy2nc3GwogaNd7UQXVGCL23A6tRi+IvPo7N/gIZLX6yUO/Nz0ZI3send+WhsqENYgQyOp4uxvVqD5tGHUD4YQUz7EISKQXjX9sCluB6b0/IYAePj47ufq1bIY5XQ4LDNAmRUXMfHyQXwrtHCo6obq5Pzsf18IX4ovQHBBRkElRr41N/HmpxKXGtS0qr1zwTzradxhFxWvxfbGLL0eGyMTca6Yjl8GgbhfPE6sv+o+iffDeoOiE5lQnBVBWFVJz6MSsKQTjdOXLP0KbAXj+VLq3VeQOF+ayPswuOYjesJ2C+rDJOTk0g9HAI/BwvCn8Ap6VUsS8iH/YlyWAUegfRm7djw8LDt02AuK1i0ZBaIG9CmbITnifNwr2iFkORyT3Elo3SLEwdrTSkM9HThcl0T5gQcAefQ71gYcAiyW43Iysqa9hTYx3ZW+Kp5FLa52kHTLMfenCI4ZVbio1w5loWJIatpwD1NC25ckjCHBMWfgeVPp8E5eBHGvnvQO/gAT/Je9+TMsN+wbN7x/LSEv4b7esg1HzG5rLujxtyvwpmN7P05mEvUsb8Ohd/RDHhGp8E2PA3vxEhguluM5Tsi6OIpGaKbBTVXyDORESdAHPEdBoeHEXJBgl3n8nGiSMao2kcawjo0DdzDEnCj8mBzIBt2cSVwKVOS3A/AKa8G7wVFoUGlIU1o+IwBC7kmYrpY/IWvQS6TwC8uBY4pEriWKuAQJcaYXg+Nthfm+5LBjS4kq4AcUADHs9XECV1wudQM76Rc5mZEbWVXV9dbj8E8VggNFrCN8FtIIJR9A1iVlAdR3T28n1iAFm0PIgqvwD69AktiimBNFykoHot2HgUnUoyt5woxqBuhoeN6vd77Cd8aWRLV4zQ8MsCXufraI0nwqu4Gn/hXkJhDfFwPe/EVWB/IhePPyZApWkgRFahXqjBqMKCtSd7Z19e9iq7VvwpHwBpvngnoRcfZKgW5YhOEN9rhSuaB22UVOL/kwzI0A1t/TcexnGK4BcdgCxGg6rg7+WepxPHZs4HD+oRWTIYOZDnpKFeqISi7DRFp1Q23B7Ai9RrYxBWcg7lg7zmOeYFxsA47C07wSUiJ/UjBvnkm+AMLypg4o5eGB7ivgJoUy4EMHTrPInkf+Jda4ZBRhaWxpeAdJgWMKmCKaLorDtUtakxMTKQ8d6J58UzKafA6c9LKZJhvSMgAv+gWfAh4vaIfblfVWCdVwuzHVMz+NgaLd0QT30ZiZExPgzOfD+aa7KfBIttZKDxzEhNkJqwMPQaLvQmwCYzG0sD9iMiUIqP8JmrudKKqpR29HW0G4oYSrVY7/0WKRQyYrE+Xm6FTpWQKWdfajo6+QeZ/bHQUqVHBCPnCHZ5sY32wv5fzf3qKSJ6TaDCZF2R6LUR8aCCaaq8hN/EYwrdtBGn7JuL3WFcr45V0x07tnSOvB7FfLVndjFPennZ/rTmV6MWZyV+zmJpNvWq4sY0WedhMZ//f/X8DbZmYfq8ITakAAAAASUVORK5CYII=" :
  "data:image/PNG;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAYCAYAAAD+vg1LAAAE/klEQVR42qWVCVDUVRzH/wEhxwKiopAgyLKLyOmoTKUcAsYtOoKZEupMXqQzDodCcTWljShGICOkawkewwoJQSAgGQoDSrK4YhmHxk1CO3LJcn77vU0NR7zqN/Pm/ee9+X9+3/c73uO41zAPM24am/v7+216e3uF3P+x5fM4XQ8znn+AnX7j+bQjxd0drRj7xx6CjOabw8PDAa8F9TJRM3Yx4C4lR+3GYys7moLv9+zBSW9vnNq4ETfz8zHU388cSF4KXGzAaXgJtDa7m7x5NzTAWQG8K5Egh4B1166hq6MDDcHBkLq5ocDREefIwV8tLQxe9GKlQs3AVQu04W+rhzs111ESG4cCe3v8ERKC0du3MVBRgZ7t2yHz9UUnjVoXF+QEBSkEjIyMhD1XrY85r5CBP93ig8rTp/HDsmXoWLUK7R4eyCWFeVu2oCoqCqWenrhHo9vPDxXOzvi9vJyplk8JdjNVFfgIeT3efHXki0UQrV0LiasrZI9+rjp//km8m6VSZNJ6Azm8uGQJws3M0PfgwQhVjeUzYG9zXgBT66zPoaWlCUk2NmgkVbLVq1GyYQPGx8fxbXwUPlhqqIDnJSbiwJw5iJg+HZtoVBYUDPX19Vk8Cxby9jGwi8EbuPebFOco+1JS3EWxzNmxQwHbtFyAFXM49HS140ZJCQI5DlEzZyJIWxvVxcUQi8Wqz4IFmnEMvNpKFw11NUjatg2Rs2Zhn44OttJcVVSM9ta7qCzOUzhJ2rkT0QRMob0gciDr7MSUMX5Xl0vc4W6Hje8Yo7FOgttUXv7KyoghRV/RiKDvEAMDiPwDkESJjNfTw6nZs3FYTQ0RFhYseXeeAnqaalq7GSrlZaUlYHhErlDT+KsEmJiAKCwMyQQ9Q5DvaOSamqLMygo/E6h0wQKEMqi5OZpv3aImHF4/6fi8SI/5qghf76oAXjl2DJ9ZW+NyphijY2NobWjAflJ6lpRlzZ2LG7a2kCxahCpK7AUTE4QvXIimmhqm9mpbW9vMR+XF6fiaa+G9eUr48exxXEvPgMjYGNfp5xOGhkhwcEDamjVIVldHBqk9Q/A0fX2kGhnhC6qCVCq3fpmMQUfkcrnvv2r5Gu4sWX4WOijNPYuyEyKk0VF/IbCUVLHjJlBijhMwg+Z4SqIkOxtXxJloqpUoTni/vaVTJrvvQDilSe3L8/Mx1xr3EWoi+5sjmBifwIWYGCTx+SijcNQSvJLieZCgLHmHSO1VsVgBHBjoxcE9m0++bcipT1kJFIpBptrdWAUXTiaxfKGO2nOvQAAxqS+3tMRF+j5EqlPJQYSKCkLIQXlmJkZHR48/pXSyrRROm+8j1MpmcEc9Dvs/fh+DD3qx284Ou6hGP5kxA9GkNo7GKYozizWrks8pXAN9fVXPBTNz52taMjBLYvXlQqRupcbQ0MBRgnypq4twUhhFrZtIa+kETSGHonXrMCyXt73wqvQWaIU+TmJZfia6m1uwi44dRsfeqqqK+upqjFH8i5KTEU0ltpf2qrOy2DUZ+Up3MBuB1HV/tjcrEtRZX081Wgv5w0EEey1FTfmlJ7fb0NDQgdjYWJWXvhxUHaWPVW+wN8LXkTtR/VMhsk8kIvJDT/gKefDiqyHYczEOh32U/nrvHD1JdB9XkJNW5mSlkZKUlpW9+BoerHpovYQ6dZuTk5PKf3qd3YzU33IzVZs3xZbyq/z/N5j8NPtNCfiLAAAAAElFTkSuQmCC" );
}

document.getElementById( 'input_uid' ).addEventListener( "input", function(e){
  if( e.target.value != "" && !isNaN(e.target.value) ){
    document.getElementById( "Uid" ).textContent = parseInt( e.target.value );
    MakeTotalValue();
  }
} );

document.getElementById( 'input_title' ).addEventListener( "input", function(e){
  document.getElementById( "Title" ).textContent = e.target.value;
  MakeTotalValue();
} );

document.getElementById( 'input_nickname' ).addEventListener( "input", function(e){
  document.getElementById( "NickName" ).textContent = e.target.value;
  MakeTotalValue();
} );

document.getElementById( 'input_money' ).addEventListener( "input", function(e){
  if( e.target.value != "" && !isNaN(e.target.value) ){
    document.getElementById( "Money" ).textContent = parseInt(e.target.value).toLocaleString();
    MakeTotalValue();
  }
} );

document.getElementById( 'input_funcoin' ).addEventListener( "input", function(e){
  if( e.target.value != "" && !isNaN(e.target.value) ){
    document.getElementById( "FunCoin" ).textContent = parseInt(e.target.value).toLocaleString();
    MakeTotalValue();
  }
} );

document.getElementById( 'input_rating' ).addEventListener( "input", function(e){
  if( e.target.value != "" && !isNaN(e.target.value) ){
    document.getElementById( "Rating" ).textContent = parseInt(e.target.value).toLocaleString();
    MakeTotalValue();
  }
} );

document.getElementById( 'input_stonepoint' ).addEventListener( "input", function(e){
  if( e.target.value != "" && !isNaN(e.target.value) ){
    document.getElementById( "StonePoint" ).textContent = parseInt(e.target.value).toLocaleString();
    MakeTotalValue();
  }
} );

document.getElementById( 'input_rubypoint' ).addEventListener( "input", function(e){
  if( e.target.value != "" && !isNaN(e.target.value) ){
    document.getElementById( "RubyPoint" ).textContent = parseInt(e.target.value).toLocaleString();
    MakeTotalValue();
  }
} );

document.getElementById( 'input_keypoint' ).addEventListener( "input", function(e){
  if( e.target.value != "" && !isNaN(e.target.value) ){
    document.getElementById( "KeyPoint" ).textContent = parseInt(e.target.value).toLocaleString();
    MakeTotalValue();
  }
} );
