// import {getStore} from '../redux';

require('file-loader?name=[name].[ext]!./index.html');
import React from 'react';
// import ReactDom from 'react-dom';
// import AppView from '../templates/AppView';
// var studioApp = require('../StudioApp').singleton;
// var FlappyVisualizationColumn = require('../flappy/FlappyVisualizationColumn');
// var Provider = require('react-redux').Provider;
// var SPAReact = require('./spa.jsx');

console.log('Hello Dayne and Anna');
// console.log(studioApp());

window.IN_UNIT_TEST = JSON.stringify(false);

// this.hideSource = false;

var config = {
  hideSource: false,
  levelGameName: 'CustomFlappy',
  skinId: 'flappy',
  baseUrl: '/blockly/',
  app: 'flappy',
  droplet: false,
  level: {
    requiredBlocks: [],
    obstacles: true,
    ground: true,
    score: true,
    freePlay: true,
    goal: {},
    scale: {
      snapRadius: 2
    },
    toolbox:
      '<xml id="toolbox" style="display: none;"><block type="flappy_flap_height"/><block type="flappy_playSound"/><block type="flappy_incrementPlayerScore"/><block type="flappy_endGame"/><block type="flappy_setSpeed"/><block type="flappy_setBackground"/><block type="flappy_setPlayer"/><block type="flappy_setObstacle"/><block type="flappy_setGround"/><block type="flappy_setGapHeight"/><block type="flappy_setGravity"/><block type="flappy_setScore"/></xml>',
    startBlocks:
      '<xml><block type="flappy_whenClick" deletable="false"/><block type="flappy_whenCollideGround" deletable="false"/><block type="flappy_whenCollideObstacle" deletable="false"/><block type="flappy_whenEnterObstacle" deletable="false"/><block type="when_run" deletable="false"/></xml>',
    levelBuilderRequiredBlocks: '<xml/>',
    skin: 'flappy',
    shareable: true,
    embed: null,
    instructionsImportant: false,
    isK1: false,
    isProjectLevel: true,
    skipInstructionsPopup: false,
    neverAutoplayVideo: false,
    disableParamEditing: true,
    disableVariableEditing: false,
    disableProcedureAutopopulate: false,
    useModalFunctionEditor: false,
    useContractEditor: false,
    contractHighlight: false,
    contractCollapse: false,
    examplesHighlight: false,
    examplesCollapse: false,
    examplesRequired: false,
    definitionHighlight: false,
    definitionCollapse: false,
    disableExamples: false,
    hideShareAndRemix: false,
    disableIfElseEditing: false,
    defaultFlap: 'NORMAL',
    sharedBlocks: [],
    levelId: 'custom',
    editCode: false,
    puzzle_number: 1,
    stage_total: 1,
    share: false,
    hideSource: false,
    iframeEmbed: false,
    iframeEmbedAppAndCode: false,
    projectType: 'flappy',
    lastAttempt: null,
    submittable: false,
    levelVideos: [],
    mapReference: null,
    referenceLinks: null,
    id: 'custom'
  },
  textToSpeechEnabled: null,
  fullWidth: true,
  noHeader: false,
  noFooter: false,
  smallFooter: true,
  codeStudioLogo: false,
  hasI18n: true,
  callouts: [],
  channel: '0BWT7RpZc7b6BeTjiycK8Q',
  readonlyWorkspace: false,
  postMilestoneMode: 'all',
  puzzleRatingsUrl: '/puzzle_ratings',
  authoredHintViewRequestsUrl: '/authored_hint_view_requests.json',
  serverLevelId: 9613,
  publicCaching: false,
  hasContainedLevels: false,
  disallowedHtmlTags: [],
  isSignedIn: false,
  isTooYoung: false,
  pinWorkspaceToBottom: true,
  hasVerticalScrollbars: true,
  showExampleTestButtons: true,
  report: {
    fallback_response: null,
    callback: null,
    sublevelCallback: null
  },
  isStartMode: false,
  isUS: true,
  send_to_phone_url: 'http://localhost-studio.code.org:3000/sms/send',
  dialog: {
    skipSound: false,
    preTitle: null,
    fallbackResponse: 'null',
    callback: null,
    sublevelCallback: null,
    app: 'flappy',
    level: 'custom',
    shouldShowDialog: true
  },
  locale: 'en_us',
  containerId: 'codeApp',
  position: {
    blockYCoordinateInterval: 25
  },
  noPadding: false,
  skinsModule: {},
  blocksModule: {},
  skin: {
    id: 'flappy',
    avatar: '/blockly/media/skins/flappy/avatar.png',
    avatar_2x: '/blockly/media/skins/flappy/avatar_2x.png',
    goal: '/blockly/media/skins/flappy/goal.png',
    obstacle: '/blockly/media/skins/flappy/obstacle.png',
    smallStaticAvatar: '/blockly/media/skins/flappy/small_static_avatar.png',
    staticAvatar: '/blockly/media/skins/flappy/static_avatar.png',
    winAvatar: '/blockly/media/skins/flappy/win_avatar.png',
    failureAvatar: '/blockly/media/skins/flappy/failure_avatar.png',
    decorationAnimation: '/blockly/media/skins/flappy/decoration_animation.png',
    decorationAnimation_2x:
      '/blockly/media/skins/flappy/decoration_animation_2x.png',
    repeatImage: '/blockly/media/common_images/repeat-arrows.png',
    leftArrow: '/blockly/media/common_images/moveleft.png',
    downArrow: '/blockly/media/common_images/movedown.png',
    upArrow: '/blockly/media/common_images/moveup.png',
    rightArrow: '/blockly/media/common_images/moveright.png',
    upLeftArrow: '/blockly/media/common_images/moveupleft.png',
    upRightArrow: '/blockly/media/common_images/moveupright.png',
    downLeftArrow: '/blockly/media/common_images/movedownleft.png',
    downRightArrow: '/blockly/media/common_images/movedownright.png',
    leftJumpArrow: '/blockly/media/common_images/jumpleft.png',
    downJumpArrow: '/blockly/media/common_images/jumpdown.png',
    upJumpArrow: '/blockly/media/common_images/jumpup.png',
    rightJumpArrow: '/blockly/media/common_images/jumpright.png',
    upLeftJumpArrow: '/blockly/media/common_images/jumpupleft.png',
    upRightJumpArrow: '/blockly/media/common_images/jumpupright.png',
    downLeftJumpArrow: '/blockly/media/common_images/jumpdownleft.png',
    downRightJumpArrow: '/blockly/media/common_images/jumpdownright.png',
    northLineDraw: '/blockly/media/common_images/draw-north.png',
    southLineDraw: '/blockly/media/common_images/draw-south.png',
    eastLineDraw: '/blockly/media/common_images/draw-east.png',
    westLineDraw: '/blockly/media/common_images/draw-west.png',
    northwestLineDraw: '/blockly/media/common_images/draw-north-west.png',
    northeastLineDraw: '/blockly/media/common_images/draw-north-east.png',
    southwestLineDraw: '/blockly/media/common_images/draw-south-west.png',
    southeastLineDraw: '/blockly/media/common_images/draw-south-east.png',
    shortLineDraw: '/blockly/media/common_images/draw-short.png',
    longLineDraw: '/blockly/media/common_images/draw-long.png',
    shortLineDrawRight: '/blockly/media/common_images/draw-short-right.png',
    longLineDrawRight: '/blockly/media/common_images/draw-long-right.png',
    longLine: '/blockly/media/common_images/move-long.png',
    shortLine: '/blockly/media/common_images/move-short.png',
    soundIcon: '/blockly/media/common_images/play-sound.png',
    clickIcon: '/blockly/media/common_images/when-click-hand.png',
    clockIcon: '/blockly/media/common_images/clock-icon.png',
    startIcon: '/blockly/media/common_images/when-run.png',
    runArrow: '/blockly/media/common_images/run-arrow.png',
    endIcon: '/blockly/media/common_images/end-icon.png',
    speedFast: '/blockly/media/common_images/speed-fast.png',
    speedMedium: '/blockly/media/common_images/speed-medium.png',
    speedSlow: '/blockly/media/common_images/speed-slow.png',
    scoreCard: '/blockly/media/common_images/increment-score-75percent.png',
    randomPurpleIcon: '/blockly/media/common_images/random-purple.png',
    startSound: [
      '/blockly/media/skins/flappy/start.mp3',
      '/blockly/media/skins/flappy/start.ogg'
    ],
    winSound: [
      '/blockly/media/skins/flappy/win.mp3',
      '/blockly/media/skins/flappy/win.ogg'
    ],
    failureSound: [
      '/blockly/media/skins/flappy/failure.mp3',
      '/blockly/media/skins/flappy/failure.ogg'
    ],
    scifi: {
      background: '/blockly/media/skins/flappy/background_scifi.png',
      avatar: '/blockly/media/skins/flappy/avatar_scifi.png',
      obstacle_bottom: '/blockly/media/skins/flappy/obstacle_bottom_scifi.png',
      obstacle_bottom_thumb:
        '/blockly/media/skins/flappy/obstacle_bottom_scifi_thumb.png',
      obstacle_top: '/blockly/media/skins/flappy/obstacle_top_scifi.png',
      ground: '/blockly/media/skins/flappy/ground_scifi.png',
      ground_thumb: '/blockly/media/skins/flappy/ground_scifi_thumb.png'
    },
    underwater: {
      background: '/blockly/media/skins/flappy/background_underwater.png',
      avatar: '/blockly/media/skins/flappy/avatar_underwater.png',
      obstacle_bottom:
        '/blockly/media/skins/flappy/obstacle_bottom_underwater.png',
      obstacle_bottom_thumb:
        '/blockly/media/skins/flappy/obstacle_bottom_underwater_thumb.png',
      obstacle_top: '/blockly/media/skins/flappy/obstacle_top_underwater.png',
      ground: '/blockly/media/skins/flappy/ground_underwater.png',
      ground_thumb: '/blockly/media/skins/flappy/ground_underwater_thumb.png'
    },
    cave: {
      background: '/blockly/media/skins/flappy/background_cave.png',
      avatar: '/blockly/media/skins/flappy/avatar_cave.png',
      obstacle_bottom: '/blockly/media/skins/flappy/obstacle_bottom_cave.png',
      obstacle_bottom_thumb:
        '/blockly/media/skins/flappy/obstacle_bottom_cave_thumb.png',
      obstacle_top: '/blockly/media/skins/flappy/obstacle_top_cave.png',
      ground: '/blockly/media/skins/flappy/ground_cave.png',
      ground_thumb: '/blockly/media/skins/flappy/ground_cave_thumb.png'
    },
    santa: {
      background: '/blockly/media/skins/flappy/background_santa.png',
      avatar: '/blockly/media/skins/flappy/santa.png',
      obstacle_bottom: '/blockly/media/skins/flappy/obstacle_bottom_santa.png',
      obstacle_bottom_thumb:
        '/blockly/media/skins/flappy/obstacle_bottom_santa_thumb.png',
      obstacle_top: '/blockly/media/skins/flappy/obstacle_top_santa.png',
      ground: '/blockly/media/skins/flappy/ground_santa.png',
      ground_thumb: '/blockly/media/skins/flappy/ground_santa_thumb.png'
    },
    night: {
      background: '/blockly/media/skins/flappy/background_night.png'
    },
    redbird: {
      avatar: '/blockly/media/skins/flappy/avatar_redbird.png'
    },
    laser: {
      obstacle_bottom: '/blockly/media/skins/flappy/obstacle_bottom_laser.png',
      obstacle_bottom_thumb:
        '/blockly/media/skins/flappy/obstacle_bottom_laser_thumb.png',
      obstacle_top: '/blockly/media/skins/flappy/obstacle_top_laser.png'
    },
    lava: {
      ground: '/blockly/media/skins/flappy/ground_lava.png',
      ground_thumb: '/blockly/media/skins/flappy/ground_lava_thumb.png'
    },
    shark: {
      avatar: '/blockly/media/skins/flappy/shark.png'
    },
    easter: {
      avatar: '/blockly/media/skins/flappy/easterbunny.png'
    },
    batman: {
      avatar: '/blockly/media/skins/flappy/batman.png'
    },
    submarine: {
      avatar: '/blockly/media/skins/flappy/submarine.png'
    },
    unicorn: {
      avatar: '/blockly/media/skins/flappy/unicorn.png'
    },
    fairy: {
      avatar: '/blockly/media/skins/flappy/fairy.png'
    },
    superman: {
      avatar: '/blockly/media/skins/flappy/superman.png'
    },
    turkey: {
      avatar: '/blockly/media/skins/flappy/turkey.png'
    },
    ground: '/blockly/media/skins/flappy/ground.png',
    ground_thumb: '/blockly/media/skins/flappy/ground_thumb.png',
    obstacle_top: '/blockly/media/skins/flappy/obstacle_top.png',
    obstacle_bottom: '/blockly/media/skins/flappy/obstacle_bottom.png',
    obstacle_bottom_thumb:
      '/blockly/media/skins/flappy/obstacle_bottom_thumb.png',
    instructions: '/blockly/media/skins/flappy/instructions.png',
    clickrun: '/blockly/media/skins/flappy/clickrun.png',
    getready: '/blockly/media/skins/flappy/getready.png',
    gameover: '/blockly/media/skins/flappy/gameover.png',
    flapIcon: '/blockly/media/skins/flappy/flap-bird.png',
    crashIcon: '/blockly/media/skins/flappy/when-crash.png',
    collideObstacleIcon: '/blockly/media/skins/flappy/when-obstacle.png',
    collideGroundIcon: '/blockly/media/skins/flappy/when-crash.png',
    enterObstacleIcon: '/blockly/media/skins/flappy/when-pass.png',
    tiles: '/blockly/media/skins/flappy/tiles.png',
    goalSuccess: '/blockly/media/skins/flappy/goal_success.png',
    obstacleScale: 1,
    largerObstacleAnimationTiles: null,
    hittingWallAnimation: null,
    approachingGoalAnimation: null,
    obstacleSound: [
      '/blockly/media/skins/flappy/obstacle.mp3',
      '/blockly/media/skins/flappy/obstacle.ogg'
    ],
    wallSound: [
      '/blockly/media/skins/flappy/wall.mp3',
      '/blockly/media/skins/flappy/wall.ogg'
    ],
    winGoalSound: [
      '/blockly/media/skins/flappy/win_goal.mp3',
      '/blockly/media/skins/flappy/win_goal.ogg'
    ],
    wall0Sound: [
      '/blockly/media/skins/flappy/wall0.mp3',
      '/blockly/media/skins/flappy/wall0.ogg'
    ],
    dieSound: [
      '/blockly/media/skins/flappy/sfx_die.mp3',
      '/blockly/media/skins/flappy/sfx_die.ogg'
    ],
    hitSound: [
      '/blockly/media/skins/flappy/sfx_hit.mp3',
      '/blockly/media/skins/flappy/sfx_hit.ogg'
    ],
    pointSound: [
      '/blockly/media/skins/flappy/sfx_point.mp3',
      '/blockly/media/skins/flappy/sfx_point.ogg'
    ],
    swooshingSound: [
      '/blockly/media/skins/flappy/sfx_swooshing.mp3',
      '/blockly/media/skins/flappy/sfx_swooshing.ogg'
    ],
    wingSound: [
      '/blockly/media/skins/flappy/sfx_wing.mp3',
      '/blockly/media/skins/flappy/sfx_wing.ogg'
    ],
    jetSound: [
      '/blockly/media/skins/flappy/jet.mp3',
      '/blockly/media/skins/flappy/jet.ogg'
    ],
    crashSound: [
      '/blockly/media/skins/flappy/crash.mp3',
      '/blockly/media/skins/flappy/crash.ogg'
    ],
    jingleSound: [
      '/blockly/media/skins/flappy/jingle.mp3',
      '/blockly/media/skins/flappy/jingle.ogg'
    ],
    laserSound: [
      '/blockly/media/skins/flappy/laser.mp3',
      '/blockly/media/skins/flappy/laser.ogg'
    ],
    splashSound: [
      '/blockly/media/skins/flappy/splash.mp3',
      '/blockly/media/skins/flappy/splash.ogg'
    ],
    background: '/blockly/media/skins/flappy/background.png'
  },
  trashcan: false,
  twitter: {
    text:
      'Check out the Flappy game I made. (Thanks @microsoft for supporting @codeorg)',
    hashtag: 'FlappyCode'
  },
  makeString: 'Make Your Own Flappy Game',
  makeUrl: 'http://code.org/flappy',
  makeImage: '/blockly/media/flappy_promo.png',
  enableShowCode: false,
  enableShowBlockCount: false,
  blockArrangement: {
    flappy_whenClick: {
      x: 20,
      y: 140
    },
    when_run: {
      x: 20,
      y: 20
    },
    flappy_whenCollideGround: {
      x: 230,
      y: 20
    },
    flappy_whenCollideObstacle: {
      x: 230,
      y: 140
    },
    flappy_whenEnterObstacle: {
      x: 230,
      y: 260
    }
  },
  wireframeShare: false
};
//
// var onMount = function() {
//     studioApp().init(config);
// };
//
// studioApp().setPageConstants(config);
// ReactDom.render(
//         <Provider store={getStore()}>
//             <AppView
//                 visualizationColumn={
//                     <FlappyVisualizationColumn
//                         showFinishButton={true}
//                     />
//                 }
//                 onMount={onMount}
//             />
//         </Provider>,
//     document.getElementById("root")
// );

var flappy = require('../flappy/flappy.js');
console.log(flappy);
flappy.init(config);
