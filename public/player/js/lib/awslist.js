
var listing;
module.exports = function(settings, callback){
  listing = [];
  getS3Data(settings,callback);
}

function getS3Data(settings,callback) {
  var s3_rest_url = createS3QueryUrl(settings);
  // set loading notice

  $.get(s3_rest_url)
    .done(function(data) {
      // clear loading notice
      //$('#listing').html('');
      debugger
      var xml = $(data);
      var info = getInfoFromS3Data(xml);
      listing = listing.concat(info.files);
      html = typeof html !== 'undefined' ? html + prepareTable(info) : prepareTable(info);
      if (info.nextMarker != "null") {
        settings.marker = info.nextMarker;
        getS3Data(settings, callback);
      } else if(typeof callback == 'function'){
        callback(listing);
      }
    })
    .fail(function(error) {
      console.error(error);
    });
}

function createS3QueryUrl(settings) {
  var BUCKET_URL = settings.bucket;
  var S3B_ROOT_DIR = settings.root;
  var S3BL_IGNORE_PATH = settings.ignore;

  var s3_rest_url = BUCKET_URL + '?delimiter=/';

  //
  // Handling paths and prefixes:
  //
  // 1. S3BL_IGNORE_PATH = false
  // Uses the pathname
  // {bucket}/{path} => prefix = {path}
  //
  // 2. S3BL_IGNORE_PATH = true
  // Uses ?prefix={prefix}
  //
  // Why both? Because we want classic directory style listing in normal
  // buckets but also allow deploying to non-buckets
  //

  var rx = '.*[?&]prefix=' + S3B_ROOT_DIR + '([^&]+)(&.*)?$';
  var prefix = '';
  if (S3BL_IGNORE_PATH==false) {
    var prefix = location.pathname.replace(/^\//, S3B_ROOT_DIR);
  }
  var match = location.search.match(rx);
  if (match) {
    prefix = S3B_ROOT_DIR + match[1];
  } else {
    if (S3BL_IGNORE_PATH) {
      var prefix = S3B_ROOT_DIR;
    }
  }
  if (prefix) {
    // make sure we end in /
    var prefix = prefix.replace(/\/$/, '') + '/';
    s3_rest_url += '&prefix=' + prefix;
  }
  if (settings.marker) {
    s3_rest_url += '&marker=' + marker;
  }
  return s3_rest_url;
}

function getInfoFromS3Data(xml) {
  var files = $.map(xml.find('Contents'), function(item) {
    item = $(item);
    return {
      Key: item.find('Key').text(),
      LastModified: item.find('LastModified').text(),
      Size: item.find('Size').text(),
      Type: 'file'
    }
  });
  var directories = $.map(xml.find('CommonPrefixes'), function(item) {
    item = $(item);
    return {
      Key: item.find('Prefix').text(),
      LastModified: '',
      Size: '0',
      Type: 'directory'
    }
  });
  if ($(xml.find('IsTruncated')[0]).text() == 'true') {
    var nextMarker = $(xml.find('NextMarker')[0]).text();
  } else {
    var nextMarker = null;
  }
  return {
    files: files,
    directories: directories,
    prefix: $(xml.find('Prefix')[0]).text(),
    nextMarker: encodeURIComponent(nextMarker)
  }
}