const mineflayer = require('mineflayer');

const SERVER = {
  host: 'lestbox.play.hosting',
  port: 25565,
  password: 'rawanbotsincoming'
};

const BOT_COUNT = 20;
const BOT_JOIN_DELAY = 30000; // 30 seconds
const LOGIN_DELAY = 10000; // 10 seconds
const PERFORMANCE_SPAM_INTERVAL = 3000; // 3 seconds

// Random name generator - Minecraft style
function generateRandomName() {
  const minecraftNames = [
    'BlockMaster', 'CreeperHunter', 'DiamondsSeeker', 'PickaxeKing', 
    'VillagerFarm', 'NetherExplorer', 'EnderDragon', 'StevePro', 
    'AlexGamer', 'MineBuilder', 'CaveFinder', 'SkeletonSlayer',
    'ZombieKiller', 'SpiderHunter', 'DungeonMaster', 'PortalJumper',
    'SwordMaster', 'ArmorSmith', 'BlockLayer', 'MineSurvivor',
    'OreDigger', 'LavaWalker', 'IceBuilder', 'ForestRunner',
    'MountainClimber', 'OceanSwimmer', 'NightRunner', 'FarmTender',
    'CropHarvester', 'AnimalTamer', 'WitchFinder', 'GolemBuilder'
  ];
  const numbers = Math.floor(Math.random() * 999) + 1;
  const randomName = minecraftNames[Math.floor(Math.random() * minecraftNames.length)];
  return `${randomName}${numbers}`;
}

// Create bot
function createBot(botNumber) {
  const botName = generateRandomName();
  const bot = mineflayer.createBot({
    host: SERVER.host,
    port: SERVER.port,
    username: botName,
    version: '1.21.1'
  });

  let isRegistered = false;
  let isLoggedIn = false;
  let spammingPerformance = false;
  let performanceInterval = null;

  console.log(`🤖 [Bot ${botNumber}] Creating: ${botName}`);

  bot.on('login', () => {
    console.log(`✅ [${botName}] Logged in to server`);
    
    setTimeout(() => {
      if (!isRegistered) {
        console.log(`📝 [${botName}] Registering...`);
        bot.chat(`/register ${SERVER.password} ${SERVER.password}`);
        isRegistered = true;
      } else {
        console.log(`🔓 [${botName}] Logging in...`);
        bot.chat(`/login ${SERVER.password}`);
      }
    }, LOGIN_DELAY);
  });

  bot.on('message', (jsonMsg) => {
    const msg = jsonMsg.toString();
    console.log(`💬 [${botName}] ${msg}`);

    // Trigger performance spam when seeing "RJ_79" or "جيش روان"
    if (msg.includes('RJ_79') || msg.includes('جيش روان')) {
      if (!spammingPerformance) {
        console.log(`🚨 [${botName}] Detected trigger! Starting performance spam...`);
        spammingPerformance = true;
        
        performanceInterval = setInterval(() => {
          if (bot.players) {
            bot.chat('-performance-');
            console.log(`📊 [${botName}] Sent: -performance-`);
          }
        }, PERFORMANCE_SPAM_INTERVAL);
      }
    }

    // Check for successful login
    if (msg.includes('logged in') || msg.includes('تم تسجيل الدخول') || msg.includes('Successfully')) {
      isLoggedIn = true;
      console.log(`✨ [${botName}] Successfully authenticated!`);
    }
  });

  bot.on('spawn', () => {
    if (isLoggedIn) {
      console.log(`🎮 [${botName}] Spawned! Starting random interactions...`);
      
      // Random movements and interactions
      setInterval(() => {
        if (bot.entity && bot.entity.position) {
          // Random movement
          const randomX = (Math.random() - 0.5) * 5;
          const randomZ = (Math.random() - 0.5) * 5;
          
          bot.setControlState('forward', Math.random() > 0.5);
          bot.setControlState('left', Math.random() > 0.5);
          bot.setControlState('right', Math.random() > 0.5);
          
          // Random look
          bot.look(Math.random() * Math.PI * 2, (Math.random() - 0.5));
          
          // Random right click (interact)
          if (Math.random() > 0.7) {
            bot.activateBlock(bot.blockAtCursor());
          }
        }
      }, 2000);
    }
  });

  bot.on('kicked', (reason) => {
    console.log(`❌ [${botName}] Kicked: ${reason}`);
    spammingPerformance = false;
    if (performanceInterval) clearInterval(performanceInterval);
    
    console.log(`🔄 [${botName}] Attempting to reconnect...`);
    setTimeout(() => {
      createBot(botNumber);
    }, 5000);
  });

  bot.on('error', (err) => {
    console.error(`⚠️ [${botName}] Error: ${err.message}`);
    spammingPerformance = false;
    if (performanceInterval) clearInterval(performanceInterval);
  });

  bot.on('end', () => {
    console.log(`🛑 [${botName}] Disconnected`);
    spammingPerformance = false;
    if (performanceInterval) clearInterval(performanceInterval);
    
    console.log(`🔄 [${botName}] Reconnecting...`);
    setTimeout(() => {
      createBot(botNumber);
    }, 5000);
  });
}

// Spawn bots with 30 second intervals
console.log('🚀 Starting bot spawner...\n');
for (let i = 0; i < BOT_COUNT; i++) {
  setTimeout(() => {
    createBot(i + 1);
  }, i * BOT_JOIN_DELAY);
}

console.log(`📊 ${BOT_COUNT} bots will spawn with ${BOT_JOIN_DELAY / 1000} second intervals\n`);
