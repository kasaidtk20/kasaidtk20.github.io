async function verifyKeyword(input, correctHash) {
  const msgUint8 = new TextEncoder().encode(input);

  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex === correctHash;
}

const TARGET_HASH = "1f17362ab6b42b0240285887a0e9e5c392332e1c8d582fec35fbe6c28cd0454c";

async function onCheckButtonClick() {
  const userInput = $("#awnser-input").val();
  const isCorrect = await verifyKeyword(userInput, TARGET_HASH);
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  if (isCorrect) {
    $('.loaderbg').fadeIn(1000);
    $(".loaderbg").css("display", "flex");
    await sleep(1000);
    const $rows = $('.unity-log-row');
    for (const row of $rows) {
      const $this = $(row);
      $this.addClass('is-active');
      await sleep(1500);
    }
    $("#logs").fadeOut(1000);
    await sleep(1000);
    $("#logs").css("font-size","40px");
    $("#logs").text("");
    $("#logs").fadeIn(1000);
    await sleep(1500);
    $("#logs").addClass("is-active");
    await sleep(1500);
    $("#logs").fadeOut(3000);
    await sleep(3000);
    alert("「カイリ」があなたをチャットルームに招待しました");
    $('.loader').fadeOut(2000);
    window.location.href = "/arg26/memberChat";
  } else {
    mistake();
  }
}

function mistake() {
  $('.input-box').addClass('shake-active');
  $('.input-box').one('animationend', function () {
    $(this).removeClass('shake-active');
    $("#awnser-input").val("");
    $("#input-text").text("ココに入力");
    $("#mistake").show();
  });
}

async function generateHash(text) {
  const msgUint8 = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

$(function () {
  function runScrambleAnimation($el) {
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    const targetText = $el.data('value') || $el.text();
    let frame = 0;
    const queue = [];

    for (let i = 0; i < targetText.length; i++) {
      const from = $el.text()[i] || '';
      const to = targetText[i];
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20);
      queue.push({ from, to, start, end, char: '' });
    }

    function update() {
      let output = '';
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        let { from, to, start, end, char } = queue[i];

        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {

          if (!char || Math.random() < 0.28) {
            char = chars[Math.floor(Math.random() * chars.length)];
            queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }

      $el.html(output);

      if (complete < queue.length) {
        requestAnimationFrame(update);
        frame++;
      }
    }

    update();
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        const $target = $(mutation.target);

        if ($target.hasClass('is-active') && !$target.data('animated')) {
          $target.data('animated', true);
          runScrambleAnimation($target);
        }
      }
    });
  });

  $('.unity-log-row').each(function () {
    observer.observe(this, { attributes: true });
  });
  $('#logs').each(function () {
    observer.observe(this, { attributes: true });
  });

});